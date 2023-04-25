import { ShapeObject } from "./shape-object";
import { angle, move, rectangle, distance, fillCircle, getNewParallelPoint, rotateText, isPointInsideRectangle } from "./library/trigonometrics";
export class ConnectionObject extends ShapeObject {
  toX: number;
  toY: number;
  mirrorLabel: boolean = false;
  align!: number;
  distance!: number;
  shape = 0;
  constructor(x: number, y: number, toX: number, toY: number, color: string) {
    super()
    this.x = x;
    this.y = y;
    this.type = 'connection';
    this.color = color;
    this.toX = toX;
    this.toY = toY;
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
    if (distance(x, y, moveNode.x, moveNode.y) <= 30) {
      return true;
    }
    if (distance(x, y, moveToNode.x, moveToNode.y) <= 30) {
      return true;
    }
    const rectangleArea = rectangle(moveNode.x, moveNode.y, 2, distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y), nodeAngle)
    if (isPointInsideRectangle({ x: x, y: y }, rectangleArea.fist, rectangleArea.second, rectangleArea.third, rectangleArea.forth)) {
      return true
    }
    return false;
  }
  override drawShape(ctx: CanvasRenderingContext2D): void {
    if (this.visible === true) {
      const nodeAngle = angle(this.x, this.y, this.toX, this.toY);
      const toNodeAngle = angle(this.toX, this.toY, this.x, this.y);
      let moveNode = move(this.x, this.y, nodeAngle, 30);
      let moveToNode = move(this.toX, this.toY, toNodeAngle, 30);
      const dist = distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y);
      rectangle(moveNode.x, moveNode.y, 2, dist, nodeAngle);
      fillCircle(ctx, moveNode.x, moveNode.y, 4, '#' + this.color);
      fillCircle(ctx, moveToNode.x, moveToNode.y, 4, '#' + this.color);
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
        rotateText(ctx, this.name, textPosition.x, textPosition.y, angleC, 'black', 16);
      } else {
        rotateText(ctx, this.name, textPosition.x, textPosition.y, angleC + Math.PI, 'black', 16);
      }
    }
  }
}
