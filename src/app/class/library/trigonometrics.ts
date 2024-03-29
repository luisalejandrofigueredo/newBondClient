import { Point } from "../interfaces/point";
import { Rectangle } from "../interfaces/rectangle";


export function distance(x: number, y: number, xx: number, yy: number): number {
  return Math.pow(Math.pow(x - xx, 2) + Math.pow(y - yy, 2), 1 / 2);
}

export function rectangle(x: number, y: number, height: number, width: number, angle: number): Rectangle {
  const point = { x: x, y: y } as Point;
  const widthOne = move(point.x, point.y, toRadians(angle), width);
  const heightOne = move(widthOne.x, widthOne.y, toRadians(angle - 90), height);
  const widthTwo = move(heightOne.x, heightOne.y, toRadians(angle - 180), width);
  return { fist: point, second: widthOne, third: heightOne, forth: widthTwo }
}

export function move(x: number, y: number, angle: number, distance: number): Point {
  return { x: x + Math.cos(angle) * distance, y: y + Math.sin(angle) * distance }
}

export function toRadians(radians: number): number {
  return radians / 180 * Math.PI;
}

export function hexColor(color: string): string {
  return '#' + color;
}

export function fillCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
  let path: Path2D = new Path2D();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  path.arc(x, y, radius, 0, 2 * Math.PI);
  path.closePath();
  ctx.fill(path)
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'black';
}

export function getZoom(ctx: CanvasRenderingContext2D): DOMMatrix {
  return ctx.getTransform();
}

export function scaleCanvas(ctx: CanvasRenderingContext2D, X: number, Y: number, zoom: number) {
  ctx.translate(X, Y);
  ctx.scale(zoom, zoom);
  ctx.translate(-X, -Y);
}

export function angle(x: number, y: number, xx: number, yy: number): number {
  const deltaY = yy - y;
  const deltaX = xx - x;
  const angleInRadians = Math.atan2(deltaY, deltaX);
  return angleInRadians
}

export function getNewParallelPoint(x: number, y: number, xx: number, yy: number, distanceToCentre: number, distanceParallel: number): Point {
  const anglePara = angle(x, y, xx, yy);
  const middlePoint = move(x, y, anglePara, distanceToCentre);
  return move(middlePoint.x, middlePoint.y, anglePara + Math.PI / 3, distanceParallel);
}

export function rotateText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, angle: number, color: string, fontSize: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.font = Math.abs(fontSize).toString() + "px Arial"
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

export function isPointInsideRectangle(point: Point, rectVertex1: Point, rectVertex2: Point, rectVertex3: Point, rectVertex4: Point): boolean {
  const vec1 = { x: rectVertex2.x - rectVertex1.x, y: rectVertex2.y - rectVertex1.y };
  const vec2 = { x: rectVertex3.x - rectVertex2.x, y: rectVertex3.y - rectVertex2.y };
  const vec3 = { x: rectVertex4.x - rectVertex3.x, y: rectVertex4.y - rectVertex3.y };
  const vec4 = { x: rectVertex1.x - rectVertex4.x, y: rectVertex1.y - rectVertex4.y };

  const vecP1 = { x: point.x - rectVertex1.x, y: point.y - rectVertex1.y };
  const vecP2 = { x: point.x - rectVertex2.x, y: point.y - rectVertex2.y };
  const vecP3 = { x: point.x - rectVertex3.x, y: point.y - rectVertex3.y };
  const vecP4 = { x: point.x - rectVertex4.x, y: point.y - rectVertex4.y };

  const isLeft1 = (vec1.x * vecP1.y - vec1.y * vecP1.x) >= 0;
  const isLeft2 = (vec2.x * vecP2.y - vec2.y * vecP2.x) >= 0;
  const isLeft3 = (vec3.x * vecP3.y - vec3.y * vecP3.x) >= 0;
  const isLeft4 = (vec4.x * vecP4.y - vec4.y * vecP4.x) >= 0;

  return isLeft1 === isLeft2 && isLeft2 === isLeft3 && isLeft3 === isLeft4;
}

export function isPointInsideTrapezoid(A:Point, B:Point, C:Point, D:Point, point:Point): boolean {
  const mAB = (B.y - A.y) / (B.x - A.x);
  const mCD = (D.y - C.y) / (D.x - C.x);

  const yAB = mAB * (point.x - A.x) + A.y;
  const yCD = mCD * (point.x - C.x) + C.y;

  if (
    point.y >= yAB &&
    point.y <= yCD &&
    point.x >= A.x &&
    point.x <= B.x
  ) {
    return true;
  } else {
    return false;
  }
}
