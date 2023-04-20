import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Node } from "../../interfaces/node";
import { NodeService } from 'src/app/services/node.service';
import { LoginService } from 'src/app/services/login.service';
import { ProjectServiceService } from 'src/app/services/project-service.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { Point } from "../../interfaces/point";
import { NumberPoint } from "../../interfaces/number-point";
import { ConnectionsService } from "../../services/connections.service";
import { Router } from '@angular/router';
import { TrigonometricService } from "../../services/trigonometric.service";
import { Relations } from "../../interfaces/relations";
import { MatDialog } from '@angular/material/dialog';
import { OkCancelComponent } from "../../ok-cancel/ok-cancel.component";
import { DialogData } from "../../ok-cancel/dialog-data";
import { ZoomService } from "../../services/zoom.service";
import { NetNodeService } from "../../services/net-node.service";
import { LabelsService } from "../../services/labels.service";
import { Labels } from 'src/app/interfaces/labels';
import { ThumbXDirective } from 'ngx-scrollbar/lib/scrollbar/thumb/thumb.directive';
interface Rectangle {
  x: number,
  y: number,
  xx: number,
  yy: number,
  xxx: number,
  yyy: number,
  xxxx: number,
  yyyy: number
}
@Component({
  selector: 'app-view-bond',
  templateUrl: './view-bond.component.html',
  styleUrls: ['./view-bond.component.sass']
})
export class ViewBondComponent implements OnInit, AfterContentInit, AfterViewInit {
  width = 1200;
  height = 600;
  menuTopLeftPosition: Point = { x: '0px', y: '0px' };
  context!: CanvasRenderingContext2D;
  private ctx!: CanvasRenderingContext2D;
  pathNodes: { path: Path2D, node: Node }[] = [];
  pathsConnections: { path: Path2D, connection: Relations }[] = [];
  pathLabel: { label: Labels }[] = [];
  canvasContext: any;
  cursor!: NumberPoint;
  cursorAdd!: NumberPoint;
  cacheNode: Node = { name: '', color: '', description: '', net: false, visible: true, x: 0, y: 0, shape: 0, angleLabel: 90, distanceLabel: 10 };
  cacheLabel!: Labels;
  cacheRelation!: Relations;
  isMovingNode = false;
  typeMenu = 1;
  isDragging = false;
  dragStartPosition = { x: 0, y: 0 };
  createConnection = false;
  createChildren = false;
  createLabel = false;
  updateLabel = false;
  domMatrix!: DOMMatrix;
  @ViewChild('myCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger!: MatMenuTrigger;
  alignNodeLabel: boolean = false;
  alignLabel: boolean = false;
  constructor(private netNodeService: NetNodeService, private zoomService: ZoomService, private matDialog: MatDialog, private connectionService: ConnectionsService, private tr: TrigonometricService, private router: Router, private projectService: ProjectServiceService, private nodeService: NodeService, private loginService: LoginService, private labelsService: LabelsService) { }

  ngAfterViewInit() {
    this.ctx.setTransform(this.zoomService.getZoom());
    this.refresh();
  }


  @HostListener('window:keydown.escape', ['$event'])
  escape() {
    if (this.createConnection === true || this.createChildren === true) {
      this.createConnection = false;
      this.createChildren = false;
      this.refresh();
    }
  }

  @HostListener("mousewheel", ["$event"])
  zoomWheel(event: WheelEvent) {
    event.preventDefault();
    const currentTransformedCursor = this.getTransformedPoint(event.offsetX, event.offsetY);
    const mouseX = currentTransformedCursor.x;
    const mouseY = currentTransformedCursor.y;
    const zoom = event.deltaY < 0 ? 1.1 : 0.9;
    this.scaleCanvas(mouseX, mouseY, zoom);
    this.zoomService.setZoom(this.ctx.getTransform());
    this.refresh();
  }

  /**
   * 
   * @param mouseX 
   * @param mouseY 
   * @param zoom 
   */
  scaleCanvas(mouseX: number, mouseY: number, zoom: number) {
    this.ctx.translate(mouseX, mouseY);
    this.ctx.scale(zoom, zoom);
    this.ctx.translate(-mouseX, -mouseY);
  }

  @HostListener("mousemove", ["$event"])
  async onMouseMove(event: MouseEvent) {
    const currentTransformedCursor = this.getTransformedPoint(event.offsetX, event.offsetY);
    if (this.isMovingNode === true) {
      this.drawNodeWhite(this.cacheNode);
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      this.menuTopLeftPosition.x = event.clientX + 'px';
      this.menuTopLeftPosition.y = event.clientY + 'px';
      this.cursor = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      this.cursor = this.getTransformedPoint(this.cursor.x, this.cursor.y);
      this.cacheNode.x = this.cursor.x;
      this.cacheNode.y = this.cursor.y;
      this.drawNode(this.cacheNode);
    } else {
      if (this.isDragging === true) {
        this.ctx.translate(currentTransformedCursor.x - this.dragStartPosition.x, currentTransformedCursor.y - this.dragStartPosition.y);
        this.zoomService.setZoom(this.ctx.getTransform());
        this.refresh();
      }
    }
  }

  @HostListener("mousedown", ["$event"])
  async onMouseDown(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.cursor = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    this.cursor = this.getTransformedPoint(this.cursor.x, this.cursor.y);
    if (event.ctrlKey === false && event.button === 0) {
      await this.inNode(event.clientX - rect.left, event.clientY - rect.top).then(async (accept) => {
        if (this.createConnection === false && this.createChildren === false) {
          this.cacheNode = <Node>accept;
          this.isMovingNode = true;
        } else {
          if (this.cacheNode.name !== (<Node>accept).name && this.createConnection === true) {
            this.createConnection = false;
            this.router.navigate(['homeBondGraph/newConnection', this.cacheNode.id, (<Node>accept).id]);
          }
          if (this.cacheNode.name !== (<Node>accept).name && this.createChildren === true) {
            this.createChildren = false;
            await this.netNodeService.add((<Node>this.cacheNode).id!, (<Node>accept).id!).then((accept) => {
              this.refresh();
            }).catch((reject) => {
            });
          }
        }
      }).catch(async (reject) => {
        this.isDragging = true;
        this.dragStartPosition = this.getTransformedPoint(event.offsetX, event.offsetY);
      });
    } else {
    }
  }

  @HostListener("mouseup", ["$event"])
  async onMouseUp(event: MouseEvent) {
    if (this.isMovingNode === true) {
      await this.nodeService.putNode(this.projectService.project, this.cacheNode).then((accept) => {
        this.refresh();
        this.isMovingNode = false;
      }).catch((reject) => { console.log('reject node modification') })
    }
    if (this.isDragging === true) {
      this.isDragging = false;
    }
  }

  addLabel(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.cursorAdd = this.getTransformedPoint(this.cursor.x, this.cursor.y);
    this.createLabel = true;
  }

  async hideNet() {
    await this.nodeService.getChildren_s(this.cacheNode.id!).then((netNode) => {
      netNode.forEach(async element => {
        await this.netNodeService.getNetNode(element.id!).then(async (viewNode) => {
          viewNode.nodeChildren.visible = false;
          await this.nodeService.putNode(this.projectService.project, viewNode.nodeChildren);
          this.refresh();
        });
      });
    });
  }

  async viewNet() {
    await this.nodeService.getChildren_s(this.cacheNode.id!).then(async (netNode) => {
      netNode.forEach(async (element) => {
        await this.netNodeService.getNetNode(element.id!).then(async (viewNode) => {
          viewNode.nodeChildren.visible = true;
          await this.nodeService.putNode(this.projectService.project, viewNode.nodeChildren);
        });
        this.refresh();
      });
    });
  }

  /**
   * 
   */
  selectCreateConnection() {
    this.createConnection = true;
    this.drawSelectedNode(this.cacheNode);
  }

  inText(x: number, y: number): Promise<Labels | boolean> {
    return new Promise((resolve, reject) => {
      const point=this.tr.currentPoint({x:x,y:y},this.ctx);
      x=point.x;
      y=point.y;
      for (let index = 0; index < this.pathLabel.length; index++) {
        const element = this.pathLabel[index];
        const rectangle = this.tr.rectangle(element.label.x, element.label.y,
          element.label.fontSize, (element.label.fontSize * element.label.text.length/2), element.label.angle);
          /*this.rectangleAngle(element.label.x, element.label.y,
            element.label.fontSize, (element.label.fontSize * element.label.text.length/2), element.label.angle)*/
        if (this.tr.isPointInsideRectangle({ x: x, y: y }, { x: rectangle.x, y: rectangle.y }, { x: rectangle.xx, y: rectangle.yy }, { x: rectangle.xxx, y: rectangle.yyy }, { x: rectangle.xxxx, y: rectangle.yyyy }) === true) {
          resolve(element.label)
        }
      }
      reject(false);
    });
  }

  /**
   * 
   * @param x 
   * @param y 
   * @returns 
   */
  async inNode(x: number, y: number): Promise<Node | boolean> {
    return new Promise(async (accept, reject) => {
      for (let index = 0; index < this.pathNodes.length; index++) {
        const element = this.pathNodes[index];
        if (this.ctx.isPointInPath(element.path, x, y)) {
          accept(element.node);
        }
      }
      reject(false)
    })
  }

  /**
   * 
   * @param cursor 
   * @returns 
   */
  async inLine(cursor: NumberPoint, first: boolean): Promise<Relations | boolean> {
    return new Promise(async (resolve, reject) => {
      for (let index = 0; index < this.pathsConnections.length; index++) {
        const element = this.pathsConnections[index];
        if (this.ctx.isPointInPath(element.path, cursor.x, cursor.y) && first === true) {
          resolve(element.connection);
        } else {
          if (this.ctx.isPointInPath(element.path, cursor.x, cursor.y) && first === false) {
            first = true;
          }
        }
      }
      reject(false);
    });
  }


  ngAfterContentInit(): void {
    this.ctx.setTransform(this.zoomService.getZoom());
    this.refresh();
  }
  /**
   * 
   */
  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    if (this.zoomService.zoom === true) {
      this.ctx.resetTransform();
      this.ctx.setTransform(this.zoomService.getZoom());
      this.refresh();
    } else {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.zoomService.init(this.ctx.getTransform());
      this.refresh();
    }
  }

  /**
   * 
   * @param event 
   */
  menuClosed(event: any) {
    if (this.createConnection === false && this.createChildren === false) {
      this.refresh();
    }
  }

  /**
   * 
   * @param event 
   */
  async menu(event: MouseEvent) {
    event.preventDefault();
    if (this.createConnection === false && this.alignLabel === false && this.alignNodeLabel === false && this.createLabel === false) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      this.menuTopLeftPosition.x = event.clientX + 'px';
      this.menuTopLeftPosition.y = event.clientY + 'px';
      this.cursor = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      this.cursor = this.getTransformedPoint(this.cursor.x, this.cursor.y);
      await this.inNode(event.clientX - rect.left, event.clientY - rect.top).then(async (node) => {
        this.typeMenu = 1;
        this.drawSelectedNode(<Node>node);
        this.cacheNode = <Node>node;
        if (this.cacheNode.net === true) {
          this.typeMenu = 1.2;
          await this.nodeService.getChildren_s(this.cacheNode.id!).then((netNode) => {
            netNode.forEach(async element => {
              this.netNodeService.getNetNode(element.id!).then((viewNode) => {
                this.drawSelectedNodeChildren(viewNode.nodeChildren);
              });
            });
          }).catch((_error) => { });
        }
        this.matMenuTrigger.openMenu();
      }).catch(async (notInNode) => {
        if (event.shiftKey === true) {
          await this.inLine({ x: event.clientX - rect.left, y: event.clientY - rect.top }, false).then(relation => {
            this.typeMenu = 2.0;
            this.cacheRelation = <Relations>relation;
            this.drawSelectedConnection(<Relations>relation);
            this.matMenuTrigger.openMenu();
          }).catch(async (never) => {
            this.typeMenu = 3.0;
            this.matMenuTrigger.openMenu();
          });
        } else {
          await this.inLine({ x: event.clientX - rect.left, y: event.clientY - rect.top }, true).then(relation => {
            this.typeMenu = 2.0;
            this.cacheRelation = <Relations>relation;
            this.drawSelectedConnection(<Relations>relation);
            this.matMenuTrigger.openMenu();
          }).catch(async (never) => {
            await this.inText(event.clientX - rect.left, event.clientY - rect.top).then((label) => {
              this.cacheLabel = <Labels>label;
              this.updateLabel = true;
            }).catch((error) => {
              this.typeMenu = 3.0;
              this.matMenuTrigger.openMenu();
            });
          });
        }
      });
    }
  }

  /**
   * 
   * @param x 
   * @param y 
   * @returns 
   */
  getTransformedPoint(x: number, y: number): NumberPoint {
    const transform = this.ctx.getTransform();
    const invertedScaleX = 1 / transform.a;
    const invertedScaleY = 1 / transform.d;
    const transformedX = invertedScaleX * x - invertedScaleX * transform.e;
    const transformedY = invertedScaleY * y - invertedScaleY * transform.f;
    return { x: transformedX, y: transformedY };
  }

  clear() {
    this.pathNodes = [];
    this.pathsConnections = [];
    this.pathLabel = [];
    this.ctx.resetTransform();
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  refresh() {
    this.clear();
    this.ctx.setTransform(this.zoomService.getZoom());
    this.drawNodes();
    this.drawConnections();
    this.drawLabels();
  }

  drawLabels() {
    this.labelsService.getLabels(this.projectService.project).then((labels) => {
      console.log('Labels', labels);
      labels.forEach(label => {
        this.drawLabel(label);
      });
    });
  }

  drawLabel(label: Labels) {
    this.rotateText(label.text, label.x, label.y, this.tr.toRadians(label.angle), label.color, label.fontSize);
    this.pathLabel.push({ label });
  }

  /**
   * 
   */
  drawConnections() {
    this.connectionService.getConnections(this.projectService.project).then((relations) => {
      relations.forEach(relation => {
        this.drawConnection(relation, relation.color);
      });
    });
  }

  /**
   * 
   */
  drawNodes() {
    this.nodeService.getNodes(this.projectService.project).then(nodes => {
      nodes.forEach(node => {
        if (node.name === this.cacheNode.name && (this.createChildren === true || this.createConnection === true)) {
          this.drawSelectedNode(node);
        }
        else {
          this.drawNode(node);
        }
      });
    });
  }

  /**
   * 
   * @param x 
   * @param y 
   * @param radius 
   * @param color 
   * @param path 
   */
  fillCircle(x: number, y: number, radius: number, color: string, path: Path2D) {
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    path.arc(x, y, radius, 0, 2 * Math.PI);
    path.closePath();
    this.ctx.fill(path)
    this.ctx.fillStyle = 'black';
    this.ctx.strokeStyle = 'black';
  }
  /**
   * 
   * @param color 
   * @returns 
   */
  hexColor(color: string): string {
    return '#' + color;
  }

  /**
   * 
   * @param node 
   */
  drawNode(node: Node) {
    if (node.visible === true) {
      switch (node.shape) {
        case 0:
          const path = new Path2D();
          const move = this.tr.move(node.x, node.y, this.tr.toRadians(node.angleLabel), node.distanceLabel);
          this.ctx.font = "16px Arial"
          this.ctx.fillText(node.name, move.x, move.y);
          this.fillCircle(node.x, node.y, 10, this.hexColor(node.color), path);
          this.ctx.lineWidth = 1;
          this.pathNodes.push({ path: new Path2D(path), node: node });
          if (node.net === true) {
            this.ctx.fillStyle = 'black';
            this.ctx.strokeStyle = 'black';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 2, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.fill()
          }
          break;
        default:
          break;
      }
    }
  }

  /**
   * 
   * @param node 
   */
  drawSelectedNode(node: Node) {
    let gradient = this.ctx.createLinearGradient(node.x - 10, node.y - 10, node.x + 10, node.y + 10);
    gradient.addColorStop(0, "blue");
    gradient.addColorStop(.25, "white");
    gradient.addColorStop(.50, "blue");
    gradient.addColorStop(.75, "white");
    gradient.addColorStop(1, "blue");
    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI);
    this.ctx.lineWidth = 5;
    this.ctx.fillStyle = '';
    this.ctx.strokeStyle = gradient;
    this.ctx.stroke();
  }

  drawSelectedNodeChildren(node: Node) {
    let path = new Path2D();
    this.fillCircle(node.x, node.y, 10, this.hexColor(node.color), path);
    let gradient = this.ctx.createLinearGradient(node.x - 10, node.y - 10, node.x + 10, node.y + 10);
    gradient.addColorStop(0, "black");
    gradient.addColorStop(0.5, "white");
    gradient.addColorStop(1, "black");
    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI);
    this.ctx.lineWidth = 5;
    this.ctx.fillStyle = gradient;
    this.ctx.strokeStyle = gradient;
    this.ctx.stroke();
  }

  /**
   * 
   * @param node 
   */
  drawNodeWhite(node: Node): void {
    const path = new Path2D;
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'white';
    this.ctx.beginPath();
    this.ctx.fillText(node.name, node.x + 10, node.y - 10);
    this.ctx.stroke();
    this.fillCircle(node.x, node.y, 10, "@ffffff", path);
    this.ctx.fillStyle = 'black';
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 1;
  }

  AlignLabel() {
    this.zoomService.setZoom(this.ctx.getTransform());
    this.alignLabel = true;
  }

  nodeChildren() {
    this.createChildren = true;
    this.drawSelectedNode(this.cacheNode);
  }

  add() {
    this.router.navigate(['nodes/newNode']);
  }

  edit() {
    this.router.navigate(['nodes/editNode', this.cacheNode.id!.toString()]);
  }

  alignLabelNode() {
    this.ctx.setTransform(this.zoomService.getZoom());
    this.refresh();
    this.alignNodeLabel = true;
  }

  addConnection() {
    this.router.navigate(['connections/add']);
  }

  editConnection() {
    this.router.navigate(['connections/edit', this.cacheRelation.id]);
  }

  mirrorLabel() {
    const dialogRef = this.matDialog.open(OkCancelComponent, {
      width: '250px',
      disableClose: true,
      enterAnimationDuration: '1000ms',
      data: { alert: true, header: "Mirror label", message: `You want change label orientation for ${this.cacheRelation.name}?` } as DialogData,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cacheRelation.mirrorLabel = !this.cacheRelation.mirrorLabel;
        this.connectionService.put(this.cacheRelation).then((relation) => {
          this.refresh();
        }).catch((error) => {
        });
      }
    });
  }

  /**
   * 
   * @param relation 
   */
  drawSelectedConnection(relation: Relations) {
    const dist = 2;
    if (relation.from.visible === true && relation.to.visible === true) {
      const nodeAngle = this.tr.angle(relation.from.x, relation.from.y, relation.to.x, relation.to.y);
      const toNodeAngle = this.tr.angle(relation.to.x, relation.to.y, relation.from.x, relation.from.y);
      let moveNode = this.tr.move(relation.from.x, relation.from.y, nodeAngle, 30);
      let moveToNode = this.tr.move(relation.to.x, relation.to.y, toNodeAngle, 30);
      const path = new Path2D;
      const circleNode = new Path2D;
      const circleToNode = new Path2D;
      this.ctx.fillStyle = 'red';
      this.ctx.strokeStyle = 'red';
      this.rectangle(relation, path, 'red');
      this.fillCircle(moveNode.x, moveNode.y, 3, 'red', circleNode);
      this.fillCircle(moveToNode.x, moveToNode.y, 3, 'red', circleToNode);
      const distance = this.tr.distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y);
      const angle = this.tr.angle(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y);
      let textPosition = { x: 0, y: 0 }
      if (relation.mirrorLabel === false) {
        textPosition = this.getNewParallelPoint(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y, distance / 2 + relation.align, relation.distance);
      }
      else {
        textPosition = this.getNewParallelPoint(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y, distance / 2 + relation.align, -relation.distance);
      }
      if (relation.mirrorLabel === false) {
        this.rotateText(relation.name, textPosition.x, textPosition.y, angle, 'red', 16);
      } else {
        this.rotateText(relation.name, textPosition.x, textPosition.y, angle + Math.PI, 'red', 16);
      }
    }
  }

  /**
   * 
   * @param relation 
   */
  drawConnection(relation: Relations, color: string) {
    const dist = 2;
    if (relation.from.visible === true && relation.to.visible === true) {
      const nodeAngle = this.tr.angle(relation.from.x, relation.from.y, relation.to.x, relation.to.y);
      const toNodeAngle = this.tr.angle(relation.to.x, relation.to.y, relation.from.x, relation.from.y);
      let moveNode = this.tr.move(relation.from.x, relation.from.y, nodeAngle, 30);
      let moveToNode = this.tr.move(relation.to.x, relation.to.y, toNodeAngle, 30);
      const path = new Path2D;
      const circleNode = new Path2D;
      const circleToNode = new Path2D;
      this.rectangle(relation, path, relation.color);
      this.fillCircle(moveNode.x, moveNode.y, 4, '#' + relation.color, circleNode);
      this.fillCircle(moveToNode.x, moveToNode.y, 4, '#' + relation.color, circleToNode);
      path.addPath(circleNode);
      path.addPath(circleToNode);
      const distance = this.tr.distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y);
      const angle = this.tr.angle(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y);
      let textPosition = { x: 0, y: 0 }
      if (relation.mirrorLabel === false) {
        textPosition = this.getNewParallelPoint(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y, distance / 2 + relation.align, relation.distance);
      }
      else {
        textPosition = this.getNewParallelPoint(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y, distance / 2 + relation.align, -relation.distance);
      }
      if (relation.mirrorLabel === false) {
        this.rotateText(relation.name, textPosition.x, textPosition.y, angle, 'black', 16);
      } else {
        this.rotateText(relation.name, textPosition.x, textPosition.y, angle + Math.PI, 'black', 16);
      }
      this.pathsConnections.push({ path: new Path2D(path), connection: relation });
    }
  }

  /**
   * 
   * @param text 
   * @param x 
   * @param y 
   * @param angle 
   */
  rotateText(text: string, x: number, y: number, angle: number, color: string, fontSize: number) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);
    this.ctx.fillStyle = color;
    this.ctx.font = Math.abs(fontSize).toString() + "px Arial"
    this.ctx.fillText(text, 0, 0);
    this.ctx.restore();
  }

  /**
   * 
   * @param x 
   * @param y 
   * @param xx 
   * @param yy 
   * @param distanceToCentre 
   * @param distanceParallel 
   * @returns 
   */
  getNewParallelPoint(x: number, y: number, xx: number, yy: number, distanceToCentre: number, distanceParallel: number): NumberPoint {
    const angle = this.tr.angle(x, y, xx, yy);
    const middlePoint = this.tr.move(x, y, angle, distanceToCentre);
    return this.tr.move(middlePoint.x, middlePoint.y, angle + Math.PI / 3, distanceParallel);
  }

  /**
   * 
   * @param relation 
   * @param path 
   */
  rectangle(relation: Relations, path: Path2D, color: string) {
    this.ctx.fillStyle = '#' + color;
    this.ctx.strokeStyle = '#' + color;
    const nodeAngle = this.tr.angle(relation.from.x, relation.from.y, relation.to.x, relation.to.y);
    const toNodeAngle = this.tr.angle(relation.to.x, relation.to.y, relation.from.x, relation.from.y);
    let moveNode = this.tr.move(relation.from.x, relation.from.y, nodeAngle, 30);
    let moveToNode = this.tr.move(relation.to.x, relation.to.y, toNodeAngle, 30);
    const distance = this.tr.distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y);
    const dist = 2;
    this.ctx.beginPath();
    moveNode = this.tr.move(moveNode.x, moveNode.y, nodeAngle + this.tr.toRadians(90), dist);
    moveToNode = this.tr.move(moveToNode.x, moveToNode.y, toNodeAngle + this.tr.toRadians(-90), dist);
    path.moveTo(moveNode.x, moveNode.y);
    path.lineTo(moveToNode.x, moveToNode.y);
    const angle = toNodeAngle + this.tr.toRadians(90);
    const secondPoint = this.tr.move(moveToNode.x, moveToNode.y, angle, dist);
    path.lineTo(secondPoint.x, secondPoint.y);
    const thirdPoint = this.tr.move(secondPoint.x, secondPoint.y, toNodeAngle, distance);
    path.lineTo(thirdPoint.x, thirdPoint.y);
    path.lineTo(moveNode.x, moveNode.y);
    path.closePath();
    this.ctx.fill(path);
    this.ctx.stroke();
    this.ctx.fillStyle = 'black';
    this.ctx.strokeStyle = 'black';
  }

  rectangleAngle(x: number, y: number, height: number, width: number, angle: number) {
    const rectangle = this.tr.rectangle(x, y, height, width, angle);
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(rectangle.xx, rectangle.yy);
    this.ctx.lineTo(rectangle.xxx, rectangle.yyy);
    this.ctx.lineTo(rectangle.xxxx, rectangle.yyyy);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  updateCanvas(update: boolean) {
    this.refresh();
  }

  formClosed(update: boolean) {
    this.ctx.setTransform(this.zoomService.getZoom());
    this.refresh();
    this.alignLabel = false;
    this.alignNodeLabel = false;
    this.createLabel = false;
    this.updateLabel = false;
  }

}