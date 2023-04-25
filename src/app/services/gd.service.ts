import { Injectable } from '@angular/core';
import { ShapeObject } from '../class/shape-object';
import { NodeObject } from '../class/node-object';
import { ConnectionObject } from "../class/connection-object";
import { LabelObject } from "../class/label-object";
interface Point {
  x: number;
  y: number
}
@Injectable({
  providedIn: 'root'
})
export class GdService {
  canvasObjects: ShapeObject[] = [];

  constructor() {
  }

  clear() {
    this.canvasObjects = [];
  }

  addNode(point: Point, name: string, radius: number, description?: string, net?: boolean, angleLabel?: number, distanceLabel?: number) {
    const newNode = new NodeObject(point.x, point.y, name, radius, description, net, angleLabel, distanceLabel);
    this.canvasObjects.push((<ShapeObject>newNode));
  }

  addConnection(point: Point, toPoint: Point, color: string) {
    const newConnection = new ConnectionObject(point.x, point.y, toPoint.x, toPoint.y, color);
    this.canvasObjects.push((<ShapeObject>newConnection));
  }

  addLabel(x: number, y: number, text: string, fontSize: number, angle: number) {
    const newLabel = new LabelObject(x, y, text, fontSize, angle);
    this.canvasObjects.push(<ShapeObject>newLabel)
  }

  click(position: Point): ShapeObject[] {
    let onclick: ShapeObject[] = []
    this.canvasObjects.forEach((element) => {
      if (element.inPoint(position.x, position.y)) {
        onclick.push(element);
      }
    });
    return onclick;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.canvasObjects.sort((a, b) => a.zOrder - b.zOrder)
    this.canvasObjects.forEach((element) => {
      element.drawShape(ctx);
    })
  };

  zoomInPoint(ctx: CanvasRenderingContext2D, x: number, y: number, zoom: number) {
    ctx.translate(x, y);
    ctx.scale(zoom, zoom);
    ctx.translate(-x, -y);
  }

}
