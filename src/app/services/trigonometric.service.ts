import { Injectable } from '@angular/core';
import { NumberPoint } from '../interfaces/number-point'
import {NodeObject} from '../class/node-object'
import { ShapeObject } from "../class/shape-object";
interface Rectangle {
  x: number,
  y: number,
  xx: number,
  yy: number,
  xxx: number,
  yyy: number,
  xxxx: number,
  yyyy: number
}

@Injectable({
  providedIn: 'root'
})
export class TrigonometricService {

  constructor() {
    
   }


  /**
     * 
     * @param x 
     * @param y 
     * @param angle 
     * @param distance 
     * @returns 
     */
  move(x: number, y: number, angle: number, distance: number): NumberPoint {
    return { x: x + Math.cos(angle) * distance, y: y + Math.sin(angle) * distance }
  }
  /**
   * 
   * @param x 
   * @param y 
   * @param xx 
   * @param yy 
   * @returns 
   */
  angle(x: number, y: number, xx: number, yy: number): number {
    const deltaY = yy - y;
    const deltaX = xx - x;
    const angleInRadians = Math.atan2(deltaY, deltaX);
    return angleInRadians
  }
  /**
   * 
   * @param radians 
   * @returns 
   */
  toGrades(radians: number): number {
    return radians * 180 / Math.PI;
  }
  /**
   * 
   * @param radians 
   * @returns 
   */
  toRadians(radians: number): number {
    return radians / 180 * Math.PI;
  }
  /**
   * 
   * @param x 
   * @param y 
   * @param xx 
   * @param yy 
   * @returns 
   */
  distance(x: number, y: number, xx: number, yy: number): number {
    return Math.pow(Math.pow(x - xx, 2) + Math.pow(y - yy, 2), 1 / 2);
  }

  /**
   * 
   * @param x 
   * @param y 
   * @param xx 
   * @param yy 
   * @returns 
   */
  earring(x: number, y: number, xx: number, yy: number): number {
    return (yy - y) / (xx - x);
  }


  isPointInsideRectangle(point: NumberPoint, rectVertex1: NumberPoint, rectVertex2: NumberPoint, rectVertex3: NumberPoint, rectVertex4: NumberPoint): boolean {
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


  pointToPixel(points: number, resolution: number): number {
    return Math.floor((points * resolution) / 72);
  }

  rectangle(x: number, y: number, height: number, width: number, angle: number): Rectangle {
    const point = { x: x, y: y };
    const widthOne = this.move(point.x, point.y, this.toRadians(angle), width);
    const heightOne = this.move(widthOne.x, widthOne.y, this.toRadians(angle - 90), height);
    const widthTwo = this.move(heightOne.x, heightOne.y, this.toRadians(angle - 180), width);
    return { x: point.x, y: point.y, xx: widthOne.x, yy: widthOne.y, xxx: heightOne.x, yyy: heightOne.y, xxxx: widthTwo.x, yyyy: widthTwo.y }
  }

  getCurrentScale(ctx: CanvasRenderingContext2D): NumberPoint {
    const transform = ctx.getTransform();
    return { x: transform.a, y: transform.d }
  }


  currentPoint(point:NumberPoint,ctx: CanvasRenderingContext2D): NumberPoint {
    const transformMatrix = ctx.getTransform();
    const inverseMatrix = transformMatrix.invertSelf();
    return inverseMatrix.transformPoint(point);
  }

  drawShape(ctx:CanvasRenderingContext2D, xOff:number, yOff:number) {
    ctx.beginPath();
    ctx.moveTo(2 + xOff, 32 + yOff);
    ctx.bezierCurveTo(131 + xOff, 37 + yOff, 119 + xOff, -5 + yOff, 231 + xOff, 3 + yOff);
    ctx.stroke();
  }

  /**
   * 
   * @param mouseX 
   * @param mouseY 
   * @param zoom 
   */
  scaleCanvas(ctx: CanvasRenderingContext2D,X: number, Y: number, zoom: number) {
    ctx.translate(X, Y);
    ctx.scale(zoom, zoom);
    ctx.translate(-X, -Y);
  }
  
  rotateText(ctx:CanvasRenderingContext2D,text: string, x: number, y: number, angle: number, color: string, fontSize: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.font = Math.abs(fontSize).toString() + "px Arial"
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }
  
}

