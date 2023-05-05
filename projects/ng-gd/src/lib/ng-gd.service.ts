import { Injectable } from '@angular/core';
import { ShapeObject } from "../class/shape-object";
import { Point } from "../interfaces/point";
import { NodeObject } from '../class/node-object';
import { ConnectionObject } from '../class/connection-object';
import { LabelObject } from '../class/label-object';
import { getTransformedPoint } from '../trigonometrics';
import { DocumentObject } from '../public-api';
import { RectangleObject } from '../class/rectangleObject';
import { CircleObject } from '../class/circleObject';
import { TriangleObject } from '../class/triangleObject';
import { MultiplesSidesObject } from '../class/multiplesSides';

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

  getLabels(): LabelObject[] {
    let labels: LabelObject[] = [];
    this.canvasObjects.forEach(element => {
      if (element instanceof LabelObject) {
        labels.push(element)
      }
    });
    return labels;
  }


  getConnections(): ConnectionObject[] {
    let connections: ConnectionObject[] = [];
    this.canvasObjects.forEach(element => {
      if (element instanceof ConnectionObject) {
        connections.push(element)
      }
    });
    return connections;
  }

  getNodes(): NodeObject[] {
    let nodes: NodeObject[] = [];
    this.canvasObjects.forEach(element => {
      if (element instanceof NodeObject) {
        nodes.push(element)
      }
    });
    return nodes;
  }

  castingMultiplesSides(id: number): MultiplesSidesObject {
    for (let index = 0; index < this.canvasObjects.length; index++) {
      const element = this.canvasObjects[index];
      if (!(element instanceof MultiplesSidesObject)) {
        console.log('error type in casting rectangle id:%s as type:%s',id,element.type)
      }
      if (element.id === id) {
        return element as MultiplesSidesObject;
      }
    }
    return <MultiplesSidesObject>{}
  }

  castingRectangle(id: number): RectangleObject {
    for (let index = 0; index < this.canvasObjects.length; index++) {
      const element = this.canvasObjects[index];
      if (!(element instanceof RectangleObject)) {
        console.log('error type in casting rectangle id:%d as type %s',id,element.type)
      }
      if (element.id === id) {
        return element as RectangleObject;
      }
    }
    return <RectangleObject>{}
  }

  castingCircle(id: number): CircleObject {
    for (let index = 0; index < this.canvasObjects.length; index++) {
      const element = this.canvasObjects[index];
      if (!(element instanceof CircleObject)) {
        console.log('error type in casting circle id:&d as type %s',id,element.type)
      }
      if (element.id === id) {
        return element as CircleObject;
      }
    }
    return <CircleObject>{}
  }

  castingNode(id: number): NodeObject {
    for (let index = 0; index < this.canvasObjects.length; index++) {
      const element = this.canvasObjects[index];
      if (!(element instanceof NodeObject)) {
        console.log('error type in casting node id:%d as type:%s',id,element.type)
      }
      if (element.id === id) {
        return element as NodeObject;
      }
    }
    return <NodeObject>{}
  }

  castingLabel(id: number): LabelObject {
    for (let index = 0; index < this.canvasObjects.length; index++) {
      const element = this.canvasObjects[index];
      if (element.id === id) {
        if (!(element instanceof LabelObject)) {
          console.log('error type in casting label id:%d as type:%s',id,element.type);
        }
        return element as LabelObject;
      }
    }
    return <LabelObject>{}
  }

  castingConnection(id: number): ConnectionObject {
    for (let index = 0; index < this.canvasObjects.length; index++) {
      const element = this.canvasObjects[index];
      if (element.id === id) {
        if (!(element instanceof ConnectionObject)) {
          console.log('error type in casting connection id:%d, as type:%s ',id,element.type);
        }
        return element as ConnectionObject;
      }
    }
    return <ConnectionObject>{}
  }

  casting(id: number): ConnectionObject | NodeObject | LabelObject | ShapeObject | RectangleObject | CircleObject | TriangleObject | MultiplesSidesObject{
    for (let index = 0; index < this.canvasObjects.length; index++) {
      const element = this.canvasObjects[index];
      if (element.id === id) {
        switch ((element as ShapeObject).type) {
          case 'label':
            return (element as LabelObject);
          case 'node':
            return (element as NodeObject);
          case 'connection':
            return (element as ConnectionObject);
          case 'rectangle':
            return (element as RectangleObject);
          case 'circle':
            return (element as CircleObject);
          case 'triangle':
              return (element as TriangleObject); 
          case 'multiplesSides':
              return (element as MultiplesSidesObject);
          default:
            break;
        }
        return (element as ShapeObject);
      }
    }
    return <ConnectionObject>{}
  }

  getMousePoint(ctx: CanvasRenderingContext2D, x: number, y: number): Point {
    return getTransformedPoint(ctx, x, y);
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
  addMultiplesSides(point:Point,sides:number,radius:number,color?:string,borderColor?:string){
    const newMultiplesSides= new MultiplesSidesObject(point.x,point.y,sides,radius,color,borderColor);
    this.canvasObjects.push(<ShapeObject>newMultiplesSides);
  }
  addTriangle(first: Point, second: Point, third: Point, color?: string, borderColor?: string) {
    const newTriangle = new TriangleObject(first, second, third, color, borderColor);
    this.canvasObjects.push(<ShapeObject>newTriangle);
  }

  addCircle(point: Point, radius: number, color?: string, borderColor?: string) {
    const newCircle = new CircleObject(point.x, point.y, radius, color, borderColor);
    this.canvasObjects.push((<ShapeObject>newCircle));
  }

  addRectangle(point: Point, width: number, height: number, color?: string, borderColor?: string) {
    const newRectangle = new RectangleObject(point.x, point.y, width, height, 10, color, borderColor);
    this.canvasObjects.push((<ShapeObject>newRectangle));
  }

  addNode(point: Point, name: string, description?: string, net?: boolean, angleLabel?: number, distanceLabel?: number) {
    const newNode = new NodeObject(point.x, point.y, name, 4, description, net, angleLabel, distanceLabel);
    this.canvasObjects.push((<ShapeObject>newNode));
  }

  addConnection(point: Point, toPoint: Point, color?: string, label?: string) {
    const newConnection = new ConnectionObject(point.x, point.y, toPoint.x, toPoint.y, color, label);
    this.canvasObjects.push((<ShapeObject>newConnection));
  }

  addLabel(point: Point, text: string, fontSize: number, angle: number) {
    const newLabel = new LabelObject(point.x, point.y, text, fontSize, angle);
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
    onclick.sort((a, b) => a.shape.zOrder - b.shape.zOrder);
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
