import { ShapeObject } from "./shape-object";
import { angle, move, rectangle, distance, fillCircle, getNewParallelPoint, rotateText, isPointInsideRectangle, translateLineToNewPosition, getTransformedPoint } from "../trigonometrics";
export class ConnectionObject extends ShapeObject {
  toX: number;
  toY: number;
  mirrorLabel: boolean = false;
  align: number = 0;
  distance: number = 0;
  shape = 0;
  constructor(x: number, y: number, toX: number, toY: number, color?: string, name?: string) {
    super()
    this.x = x;
    this.y = y;
    this.type = 'connection';
    if (color !== undefined) {
      this.color = color;
    } else {
      this.color = this.FgColor;
    }
    this.toX = toX;
    this.toY = toY;
    if (name !== undefined) {
      this.name = name;
    }
  }



  set MirrorLabel(mirror: boolean) {
    this.mirrorLabel = mirror
  }

  get MirrorLabel(): boolean {
    return this.mirrorLabel;
  }

  override moveMouse(ctx: CanvasRenderingContext2D, event: MouseEvent) {
    const point = getTransformedPoint(ctx, event.offsetX, event.offsetY);
    let deltaX=0;
    let deltaY=0;
    if (ShapeObject.lastMove.x!==0 && ShapeObject.lastMove.y!==0){
      deltaX=point.x-ShapeObject.lastMove.x;
      deltaY=point.y-ShapeObject.lastMove.y;
      this.x+=deltaX;
      this.y+=deltaY;
    }
    this.move(point.x+deltaX, point.y+deltaY)
  }

  moveMouseXY(ctx: CanvasRenderingContext2D, event: MouseEvent) {
    const point = getTransformedPoint(ctx, event.offsetX, event.offsetY);
    if (ShapeObject.lastMove.x!==0 && ShapeObject.lastMove.y!==0){
        const deltaX=point.x-ShapeObject.lastMove.x;
        const deltaY=point.y-ShapeObject.lastMove.y;
        this.x+=deltaX;
        this.y+=deltaY;
    }
    ShapeObject.lastMove=point;
  }

  moveMouseToXY(ctx: CanvasRenderingContext2D, event: MouseEvent) {
    const point = getTransformedPoint(ctx, event.offsetX, event.offsetY);
        if (ShapeObject.lastMove.x!==0 && ShapeObject.lastMove.y!==0){
            const deltaX=point.x-ShapeObject.lastMove.x;
            const deltaY=point.y-ShapeObject.lastMove.y;
            this.toX+=deltaX;
            this.toY+=deltaY;
        }
        ShapeObject.lastMove=point;
  }

  override move(x: number, y: number): void {
    const point = translateLineToNewPosition({ x: this.x, y: this.y }, { x: this.toX, y: this.toY }, { x: x, y: y });
    this.x = point.newPointA.x;
    this.y = point.newPointA.y;
    this.toX = point.newPointB.x;
    this.toY = point.newPointB.y;
  }

  override inverseShape(ctx: CanvasRenderingContext2D): void {
    if (this.visible === true) {
      ctx.fillStyle = this.BgColor;
      ctx.strokeStyle = this.BgColor;
      const nodeAngle = angle(this.x, this.y, this.toX, this.toY);
      const toNodeAngle = angle(this.toX, this.toY, this.x, this.y);
      let moveNode = move(this.x, this.y, nodeAngle, 30);
      let moveToNode = move(this.toX, this.toY, toNodeAngle, 30);
      const dist = distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y);
      const rect = rectangle(moveNode.x, moveNode.y, 2, dist, nodeAngle);
      ctx.beginPath();
      ctx.moveTo(rect.first.x, rect.first.y);
      ctx.lineTo(rect.second.x, rect.second.y);
      ctx.lineTo(rect.third.x, rect.third.y);
      ctx.lineTo(rect.forth.x, rect.forth.y);
      ctx.lineTo(rect.first.x, rect.first.y);
      ctx.fill();
      fillCircle(ctx, moveNode.x, moveNode.y, 4, this.BgColor);
      fillCircle(ctx, moveToNode.x, moveToNode.y, 4, this.BgColor);
      const distPara = distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y);
      const angleC = angle(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y);
      let textPosition = { x: 0, y: 0 }
      if (this.mirrorLabel === false) {
        textPosition = getNewParallelPoint(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y, distPara / 2 + this.align, this.distance);
      }
      else {
        textPosition = getNewParallelPoint(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y, distPara / 2 + this.align, - this.distance);
      }
      if (this.mirrorLabel === false) {
        rotateText(ctx, this.name, textPosition.x, textPosition.y, angleC, this.FgColor, 16);
      } else {
        rotateText(ctx, this.name, textPosition.x, textPosition.y, angleC + Math.PI, this.FgColor, 16);
      }
    }
  }

  moveTo(x: number, y: number) {
    this.toX = x;
    this.toY = y;
  }

  moveToAngle(angle: number, dist: number) {
    this.toX = this.toX + Math.cos(angle) * dist;
    this.toY = this.toY + Math.sin(angle) * dist;
  }

  override inPoint(x: number, y: number): boolean {
    const nodeAngle = angle(this.x, this.y, this.toX, this.toY);
    const toNodeAngle = angle(this.toX, this.toY, this.x, this.y);
    let moveNode = move(this.x, this.y, nodeAngle, 30);
    let moveToNode = move(this.toX, this.toY, toNodeAngle, 30);
    if (distance(x, y, moveNode.x, moveNode.y) <= 4) {
      return true;
    }
    if (distance(x, y, moveToNode.x, moveToNode.y) <= 4) {
      return true;
    }
    const rectangleArea = rectangle(moveNode.x, moveNode.y, 2, distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y), nodeAngle)
    if (isPointInsideRectangle({ x: x, y: y }, rectangleArea.first, rectangleArea.second, rectangleArea.third, rectangleArea.forth)) {
      return true
    }
    return false;
  }

  inRectangle(x: number, y: number): boolean {
    const nodeAngle = angle(this.x, this.y, this.toX, this.toY);
    const toNodeAngle = angle(this.toX, this.toY, this.x, this.y);
    let moveNode = move(this.x, this.y, nodeAngle, 40);
    let moveToNode = move(this.toX, this.toY, toNodeAngle, 40);
    const rectangleArea = rectangle(moveNode.x, moveNode.y, 2, distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y), nodeAngle)
    if (isPointInsideRectangle({ x: x, y: y }, rectangleArea.first, rectangleArea.second, rectangleArea.third, rectangleArea.forth)) {
      return true;
    }
    return false;
  }

  inPointXY(x: number, y: number): boolean {
    const nodeAngle = angle(this.x, this.y, this.toX, this.toY);
    let moveNode = move(this.x, this.y, nodeAngle, 30);
    if (distance(x, y, moveNode.x, moveNode.y) <= 4) {
      return true;
    }
    return false;
  }

  inPointToXY(x: number, y: number): boolean {
    const toNodeAngle = angle(this.toX, this.toY, this.x, this.y);
    let moveToNode = move(this.toX, this.toY, toNodeAngle, 30);
    if (distance(x, y, moveToNode.x, moveToNode.y) <= 4) {
      return true;
    }
    return false;
  }

  override drawShape(ctx: CanvasRenderingContext2D): void {
    if (this.visible === true) {
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
      const nodeAngle = angle(this.x, this.y, this.toX, this.toY);
      const toNodeAngle = angle(this.toX, this.toY, this.x, this.y);
      let moveNode = move(this.x, this.y, nodeAngle, 30);
      let moveToNode = move(this.toX, this.toY, toNodeAngle, 30);
      const dist = distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y);
      const rect = rectangle(moveNode.x, moveNode.y, 2, dist, nodeAngle);
      ctx.beginPath();
      ctx.moveTo(rect.first.x, rect.first.y);
      ctx.lineTo(rect.second.x, rect.second.y);
      ctx.lineTo(rect.third.x, rect.third.y);
      ctx.lineTo(rect.forth.x, rect.forth.y);
      ctx.lineTo(rect.first.x, rect.first.y);
      ctx.fill();
      fillCircle(ctx, moveNode.x, moveNode.y, 4, this.color);
      fillCircle(ctx, moveToNode.x, moveToNode.y, 4, this.color);
      const distPara = distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y);
      const angleC = angle(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y);
      let textPosition = { x: 0, y: 0 }
      if (this.mirrorLabel === false) {
        textPosition = getNewParallelPoint(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y, distPara / 2 + this.align, this.distance);
      }
      else {
        textPosition = getNewParallelPoint(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y, distPara / 2 + this.align, - this.distance);
      }
      if (this.mirrorLabel === false) {
        rotateText(ctx, this.name, textPosition.x, textPosition.y, angleC, this.FgColor, 16);
      } else {
        rotateText(ctx, this.name, textPosition.x, textPosition.y, angleC + Math.PI, this.FgColor, 16);
      }
    }
  }

}
