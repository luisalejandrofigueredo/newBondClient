import { CommonProperties } from "../interfaces/common-properties";
import { Point } from "../interfaces/point";
export abstract class ShapeObject implements CommonProperties {
  private static maxId: number = -1;
  private static maxZOrder: number = 0;
  private static bgColor = "#000000";
  private static fgColor = "#ffffff";
  public static width = 0;
  public static height = 0;
  public static lastMove:Point={x:0,y:0};
  id: number = 0;
  x = 0;
  y = 0;
  name = '';
  zOrder = 0;
  color = '#ff0000';
  visible = true;
  type = '';
  constructor() {
    ShapeObject.maxId++;
    this.id = ShapeObject.maxId;
  }
  abstract drawShape(ctx: CanvasRenderingContext2D): void;
  abstract inverseShape(ctx: CanvasRenderingContext2D): void;
  abstract inPoint(x: number, y: number): boolean;
  abstract move(x:number,y:number):void ;
  abstract moveMouse(ctx: CanvasRenderingContext2D, event: MouseEvent):void;
  
  moveAngle(angle: number, dist: number) {
    this.x = this.x + Math.cos(angle) * dist;
    this.y = this.y + Math.sin(angle) * dist;
  }

  toFront() {
    ShapeObject.maxZOrder++;
    this.zOrder = ShapeObject.maxZOrder;
  }

  toTop() {
    this.zOrder = ShapeObject.maxZOrder;
  }

  toBack() {
    this.zOrder = 0
  }

  nextZOrder() {
    if (this.zOrder < ShapeObject.maxZOrder) {
      this.zOrder++;
    }
  }

  backZOrder() {
    if (this.zOrder > 0) {
      this.zOrder--;
    }
  }

  set Visible(visible: boolean) {
    this.visible = visible;
  }

  get Visible() {
    return this.visible;
  }

  set Color(color: string) {
    this.color = color;
  }

  get Color() {
    return this.color;
  }

  get Name() {
    return this.name;
  }

  set Name(name: string) {
    this.name = name;
  }

  get BgColor() {
    return ShapeObject.bgColor;
  }

  set BgColor(color: string) {
    ShapeObject.bgColor = color;
  }

  get FgColor() {
    return ShapeObject.fgColor;
  }

  set FgColor(color: string) {
    ShapeObject.fgColor = color;
  }

  resetMouse(){
    ShapeObject.lastMove={x:0,y:0};
  }
}
