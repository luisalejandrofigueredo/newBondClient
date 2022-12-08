import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Node } from "../../interfaces/node";
import { NodeService } from 'src/app/services/node.service';
import { LoginService } from 'src/app/services/login.service';
import { ProjectServiceService } from 'src/app/services/project-service.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { Point } from "../../interfaces/point";
import { NumberPoint } from "../../interfaces/number-point";
import { ConnectionsService } from "../../services/connections.service";
import { Router } from '@angular/router';
import { TrigonometricService } from "../../service/trigonometric.service";
import { Relations } from "../../interfaces/relations";
import { MatDialog } from '@angular/material/dialog';
import { OkCancelComponent } from "../../ok-cancel/ok-cancel.component";
import { DialogData } from "../../ok-cancel/dialog-data";
import { ZoomService } from "../../services/zoom.service";

@Component({
  selector: 'app-view-bond',
  templateUrl: './view-bond.component.html',
  styleUrls: ['./view-bond.component.sass']
})
export class ViewBondComponent implements OnInit {
  width = 1200;
  height = 600;
  menuTopLeftPosition: Point = { x: '0px', y: '0px' };
  context!: CanvasRenderingContext2D;
  private ctx!: CanvasRenderingContext2D;
  pathNodes: { path: Path2D, node: Node }[] = [];
  pathsConnections: { path: Path2D, connection: Relations }[] = [];
  canvasContext: any;
  cursor!: NumberPoint;
  cacheNode: Node = { name: '', color: '', description: '', net: false, visible: true, x: 0, y: 0 };
  cacheRelation!: Relations;
  isMovingNode = false;
  typeMenu = 1;
  isDragging = false;
  dragStartPosition = { x: 0, y: 0 };
  createConnection = false;
  createChildren = false;
  domMatrix!: DOMMatrix;
  @ViewChild('myCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger!: MatMenuTrigger;
  constructor(private zoomService: ZoomService, private matDialog: MatDialog, private connectionService: ConnectionsService, private tr: TrigonometricService, private router: Router, private projectService: ProjectServiceService, private nodeService: NodeService, private loginService: LoginService) { }
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
    this.refresh();
  }

  scaleCanvas(mouseX: number, mouseY: number, zoom: number) {
    this.ctx.translate(mouseX, mouseY);
    this.ctx.scale(zoom, zoom);
    this.ctx.translate(-mouseX, -mouseY);
    this.zoomService.newZoom(mouseX, mouseY, zoom);
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
    }
    if (this.isDragging === true) {
      this.ctx.translate(currentTransformedCursor.x - this.dragStartPosition.x, currentTransformedCursor.y - this.dragStartPosition.y);
      this.refresh();
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
      await this.inNode(event.clientX - rect.left, event.clientY - rect.top).then((accept) => {
        if (this.createConnection == false && this.createChildren === false) {
          this.cacheNode = <Node>accept;
          this.isMovingNode = true;
        } else {
          if (this.cacheNode.name !== (<Node>accept).name && this.createConnection === true) {
            this.createConnection = false;
            this.router.navigate(['homeBondGraph/newConnection', this.cacheNode.id, (<Node>accept).id]);
          }
          if (this.cacheNode.name !== (<Node>accept).name && this.createChildren === true) {
            this.createChildren = false;
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

  selectCreateConnection() {
    this.createConnection = true;
    this.drawSelectedNode(this.cacheNode);
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

  async inLine(cursor: NumberPoint): Promise<Relations | boolean> {
    return new Promise(async (resolve, reject) => {
      for (let index = 0; index < this.pathsConnections.length; index++) {
        const element = this.pathsConnections[index];
        if (this.ctx.isPointInPath(element.path, cursor.x, cursor.y)) {
          resolve(element.connection);
        }
      }
      reject(false);
    });
  }


  ngOnInit(): void {
    this.canvasContext = this.canvas.nativeElement;
    this.ctx = this.canvasContext.getContext('2d')!;
    if (this.zoomService.zoom === true) {
      this.ctx.setTransform(this.zoomService.setZoom());
    } else {
      this.zoomService.init(this.ctx.getTransform())
    }
    this.refresh();
  }

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
    if (this.createConnection === false) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      this.menuTopLeftPosition.x = event.clientX + 'px';
      this.menuTopLeftPosition.y = event.clientY + 'px';
      this.cursor = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      this.cursor = this.getTransformedPoint(this.cursor.x, this.cursor.y);
      await this.inNode(event.clientX - rect.left, event.clientY - rect.top).then((node) => {
        this.typeMenu = 1;
        this.drawSelectedNode(<Node>node);
        this.cacheNode = <Node>node;
        if (this.cacheNode.net === true) {
          this.typeMenu = 1.2
        }
        this.matMenuTrigger.openMenu();
      }).catch(async (notInNode) => {
        await this.inLine({ x: event.clientX - rect.left, y: event.clientY - rect.top }).then(relation => {
          this.typeMenu = 2.0;
          this.cacheRelation = <Relations>relation;
          this.drawSelectedConnection(<Relations>relation);
          this.matMenuTrigger.openMenu();
        }).catch((never) => {
          this.typeMenu = 3.0;
          this.matMenuTrigger.openMenu();
        });
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
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.ctx.restore();
  }

  refresh() {
    this.clear();
    this.drawNodes();
    this.drawConnections();
  }

  drawConnections() {
    this.connectionService.getConnections(this.projectService.project).then((relations) => {
      relations.forEach(relation => {
        this.drawConnection(relation);
      });
    });
  }

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
    const path = new Path2D();
    this.ctx.fillText(node.name, node.x + 10, node.y - 10);
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
  }

  drawSelectedNode(node: Node) {
    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI);
    this.ctx.lineWidth = 5;
    this.ctx.fillStyle = '';
    let gradient = this.ctx.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop(0, "magenta");
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(1.0, "red");
    this.ctx.strokeStyle = gradient;
    this.ctx.stroke();
  }

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
    this.router.navigate(['homeBondGraph/alignLabel', this.cacheRelation.id]);
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

  drawSelectedConnection(relation: Relations) {
    if (relation.from.visible === true && relation.to.visible === true) {
      const nodeAngle = this.tr.angle(relation.from.x, relation.from.y, relation.to.x, relation.to.y);
      const toNodeAngle = this.tr.angle(relation.to.x, relation.to.y, relation.from.x, relation.from.y);
      const moveNode = this.tr.move(relation.from.x, relation.from.y, nodeAngle, 30);
      const moveToNode = this.tr.move(relation.to.x, relation.to.y, toNodeAngle, 30);
      const path = new Path2D;
      const circleNode = new Path2D;
      const circleToNode = new Path2D;
      this.ctx.fillStyle = 'red';
      this.ctx.strokeStyle = 'red';
      this.rectangle(relation, path);
      this.fillCircle(moveNode.x, moveNode.y, 3, 'red', circleNode);
      this.fillCircle(moveToNode.x, moveToNode.y, 3, 'red', circleToNode);
    }
  }

  drawConnection(relation: Relations) {
    if (relation.from.visible === true && relation.to.visible === true) {
      const nodeAngle = this.tr.angle(relation.from.x, relation.from.y, relation.to.x, relation.to.y);
      const toNodeAngle = this.tr.angle(relation.to.x, relation.to.y, relation.from.x, relation.from.y);
      const moveNode = this.tr.move(relation.from.x, relation.from.y, nodeAngle, 30);
      const moveToNode = this.tr.move(relation.to.x, relation.to.y, toNodeAngle, 30);
      const path = new Path2D;
      const circleNode = new Path2D;
      const circleToNode = new Path2D;
      this.rectangle(relation, path);
      this.fillCircle(moveNode.x, moveNode.y, 3, 'black', circleNode);
      this.fillCircle(moveToNode.x, moveToNode.y, 3, 'black', circleToNode);
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
        this.rotateText(relation.name, textPosition.x, textPosition.y, angle);
      } else {
        this.rotateText(relation.name, textPosition.x, textPosition.y, angle + Math.PI);
      }
      this.pathsConnections.push({ path: new Path2D(path), connection: relation });
    }
  }

  rotateText(text: string, x: number, y: number, angle: number) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);
    this.ctx.fillText(text, 0, 0);
    this.ctx.restore();
  }

  getNewParallelPoint(x: number, y: number, xx: number, yy: number, distanceToCentre: number, distanceParallel: number): NumberPoint {
    const angle = this.tr.angle(x, y, xx, yy);
    const middlePoint = this.tr.move(x, y, angle, distanceToCentre);
    return this.tr.move(middlePoint.x, middlePoint.y, angle + Math.PI / 3, distanceParallel);
  }

  rectangle(relation: Relations, path: Path2D) {
    const nodeAngle = this.tr.angle(relation.from.x, relation.from.y, relation.to.x, relation.to.y);
    const toNodeAngle = this.tr.angle(relation.to.x, relation.to.y, relation.from.x, relation.from.y);
    const moveNode = this.tr.move(relation.from.x, relation.from.y, nodeAngle, 30);
    const moveToNode = this.tr.move(relation.to.x, relation.to.y, toNodeAngle, 30);
    const distance = this.tr.distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y);
    const dist = 1;
    this.ctx.beginPath();
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
  }
}
