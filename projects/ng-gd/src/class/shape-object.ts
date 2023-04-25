import { CommonProperties } from "../interfaces/common-properties";
export abstract class ShapeObject implements CommonProperties {
  private static maxId: number = 0;
  private static maxZOrder: number = 0;
  id: number = 0;
  x = 0;
  y = 0;
  name = '';
  zOrder = 0;
  color = '#000000';
  visible = true;
  type = '';
  constructor() {
    ShapeObject.maxId++;
    this.id = ShapeObject.maxId;
  }
  abstract drawShape(ctx: CanvasRenderingContext2D): void;
  abstract inPoint(x: number, y: number): boolean;
  move(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

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
    this.visible=visible;
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

  get Name(){
    return this.name;
  }

  set Name(name:string){
    this.name=name;
  }
}
