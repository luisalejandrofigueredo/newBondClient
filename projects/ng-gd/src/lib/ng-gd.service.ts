import { Injectable } from '@angular/core';
import { ShapeObject } from "../class/shape-object";
import { Point } from "../interfaces/point";
import { NodeObject } from '../class/node-object';
import { ConnectionObject } from '../class/connection-object';
import { LabelObject } from '../class/label-object';
import { getTransformedPoint } from '../trigonometrics';
import { DocumentObject } from '../public-api';

@Injectable({
  providedIn: 'root'
})
export class NgGdService {
  canvasObjects: any[] = [];
  width = 800;
  height = 600;
  bkColor: string = "#000000";
  frColor: string = "#ffffff";
  clicks: { shape: ShapeObject, action: string }[] = [];
  constructor() { }

  start(width: number, height: number) {
    if (this.canvasObjects.length === 0) {
      this.canvasObjects.push(new DocumentObject(width, height));
    } else {
      (this.getItem(0) as unknown as DocumentObject).setSize(width, height);
    }
  }

  setDarkMode() {
    this.bkColor = "#000000";
    this.frColor = "#ffffff";
    this.getItem(0).BgColor = this.bkColor;
    this.getItem(0).FgColor = this.frColor;
  }

  setLightMode() {
    this.bkColor = "#ffffff";
    this.frColor = "#000000";
    this.getItem(0).BgColor = this.bkColor;
    this.getItem(0).FgColor = this.frColor;
  }



  canvasSetSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  clear(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.bkColor;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  clearObjects() {
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
    this.canvasObjects.push(newLabel)
  }

  click(ctx: CanvasRenderingContext2D, event: MouseEvent): { shape: ShapeObject, action: string }[] {
    const currentTransformedCursor = getTransformedPoint(ctx, event.offsetX, event.offsetY);
    this.clicks = this.touch(currentTransformedCursor, ctx);
    return this.clicks;
  }

  getClicks() {
    return this.clicks;
  }

  touch(position: Point, ctx?: CanvasRenderingContext2D): { shape: ShapeObject, action: string }[] {
    let onclick: { shape: ShapeObject, action: string }[] = []
    this.canvasObjects.forEach((element) => {
      if (element.inPoint(position.x, position.y)) {
        onclick.push({ shape: element, action: 'inPoint' });
      }
      if (element.type === 'connection') {
        if ((element as ConnectionObject).inPointXY(position.x, position.y)) {
          onclick.push({ shape: element, action: 'inPointXY' });
        }
        if ((element as ConnectionObject).inPointToXY(position.x, position.y)) {
          onclick.push({ shape: element, action: 'inPointToXY' });
        }
        if ((element as ConnectionObject).inRectangle(position.x, position.y)) {
          onclick.push({ shape: element, action: 'inRectangle' });
        }
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

  getItem(id: number): ShapeObject {
    for (let index = 0; index < this.canvasObjects.length; index++) {
      const element = this.canvasObjects[index];
      if (element.id === id) {
        return element;
      }
    }
    return <ShapeObject>{ id: 0, color: "", name: "error" };
  }
}
