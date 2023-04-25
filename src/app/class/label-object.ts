import { ShapeObject } from "./shape-object";
import  {move,toRadians,isPointInsideRectangle}  from "../class/library/trigonometrics";
import { Rectangle } from "./interfaces/rectangle";

export class LabelObject extends ShapeObject {
    angle: number = 0;
    fontSize = 16;
    text: string = "select label text";
    sizeText=0;
    constructor(x: number, y: number, text: string, fontSize?: number, angle?: number) {
        super()
        this.x = x;
        this.y = y;
        this.type = 'label';
        this.text = text;
        if (fontSize) {
            this.fontSize = fontSize;
        }
        if (angle) {
            this.angle = angle;
        }
    }
    override inPoint(x: number, y: number): boolean {
        const rectangle=this.rectangle(x,y,this.fontSize,this.sizeText,this.angle)
        return isPointInsideRectangle({x:x,y:y},rectangle.fist,rectangle.second,rectangle.third,rectangle.forth)
    }
    override drawShape(ctx: CanvasRenderingContext2D): void {
        this.sizeText=ctx.measureText(this.text).width;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.font = Math.abs(this.fontSize).toString() + "px Arial"
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }

    rectangle(x: number, y: number, height: number, width: number, angle: number): Rectangle {
        const point = { x: x, y: y };
        const widthOne = move(point.x, point.y, toRadians(angle), width);
        const heightOne = move(widthOne.x, widthOne.y, toRadians(angle - 90), height);
        const widthTwo = move(heightOne.x, heightOne.y, toRadians(angle - 180), width);
        return { fist:point, second:widthOne, third:heightOne,forth:widthTwo }
      }
}
