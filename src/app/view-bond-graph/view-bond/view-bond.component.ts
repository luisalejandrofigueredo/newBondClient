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
@Component({
  selector: 'app-view-bond',
  templateUrl: './view-bond.component.html',
  styleUrls: ['./view-bond.component.sass']
})
export class ViewBondComponent implements OnInit {
  width = 800;
  height = 600;
  menuTopLeftPosition: Point = { x: '0px', y: '0px' };

  context!: CanvasRenderingContext2D;
  private ctx!: CanvasRenderingContext2D;
  pathNodes: { path: Path2D, node: Node }[] = [];
  pathsConnections: { path: Path2D, node: Node }[] = [];
  canvasContext: any;
  cursor!: NumberPoint;
  cacheNode!: Node;
  isMovingNode = false;
  @ViewChild('myCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger!: MatMenuTrigger;
  constructor(private connectionService: ConnectionsService, private tr: TrigonometricService, private router: Router, private projectService: ProjectServiceService, private nodeService: NodeService, private loginService: LoginService) { }

  @HostListener("mousewheel", ["$event"])
  zoomWheel(event: WheelEvent) {
    event.preventDefault();
    const currentTransformedCursor = this.getTransformedPoint(event.offsetX, event.offsetY);
    this.clear();
    const mouseX = currentTransformedCursor.x;
    const mouseY = currentTransformedCursor.y;
    const zoom = event.deltaY < 0 ? 1.1 : 0.9;
    this.ctx.translate(mouseX, mouseY);
    this.ctx.scale(zoom, zoom);
    this.ctx.translate(-mouseX, -mouseY);
    this.refresh();
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
  }

  @HostListener("mousedown", ["$event"])
  async onMouseDown(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.cursor = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    this.cursor = this.getTransformedPoint(this.cursor.x, this.cursor.y);
    if (event.ctrlKey === false) {
      await this.inNode(event.clientX - rect.left, event.clientY - rect.top).then((accept) => {
        this.cacheNode = <Node>accept;
        this.isMovingNode = true;
      }).catch((reject) => {
      });
    }
  }

  @HostListener("mouseup", ["$event"])
  async onMouseUp(event: MouseEvent) {
    if (this.isMovingNode === true) {
      await this.nodeService.putNode(this.projectService.project, this.cacheNode).then((accept) => {
        this.refresh();
      }).catch((reject) => { console.log('reject node modification') })
      this.isMovingNode = false;
    }
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

  ngOnInit(): void {
    this.canvasContext = this.canvas.nativeElement;
    this.ctx = this.canvasContext.getContext('2d')!;
    this.clear();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.refresh();
  }

  /**
   * 
   * @param event 
   */
  async menu(event: MouseEvent) {
    event.preventDefault();
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.cursor = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    this.cursor = this.getTransformedPoint(this.cursor.x, this.cursor.y);
    this.matMenuTrigger.openMenu();
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
        this.drawNode(node);
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

  add() {
    this.router.navigate(['nodes/newNode']);
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
      this.pathsConnections.push({ path: new Path2D(path), node: relation.from });
    }
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
