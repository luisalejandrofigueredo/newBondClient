import { Injectable } from '@angular/core';
import {NumberPoint } from '../interfaces/number-point' 
@Injectable({
  providedIn: 'root'
})
export class TrigonometricService {

  constructor() { }


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
    return (yy - y / xx - x);
  }


}
