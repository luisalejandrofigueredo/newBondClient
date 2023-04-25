import { ShapeObject } from "./shape-object";
import { move, toRadians, isPointInsideRectangle, rectangle } from "../trigonometrics";
import { Rectangle } from "../interfaces/rectangle";

export class LabelObject extends ShapeObject {
    angle: number = 0;
    fontSize = 16;
    text: string = "select label text";
    sizeText = 0;
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
            this.setAngleInGrades(angle);
        }
    }

    override inPoint(x: number, y: number): boolean {
        const rect = rectangle(x, y, this.fontSize, this.sizeText, this.angle);
        return isPointInsideRectangle({ x: x, y: y }, rect.first, rect.second, rect.third, rect.forth);
    }
    override drawShape(ctx: CanvasRenderingContext2D): void {
        this.sizeText = ctx.measureText(this.text).width;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.font = Math.abs(this.fontSize).toString() + "px Arial"
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }

    setAngleInGrades(grades: number) {
        this.angle = toRadians(grades);
    }
}
