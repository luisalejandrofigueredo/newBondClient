import { ShapeObject } from "./shape-object";
import { toRadians, isPointInsideRectangle, rectangle, getTransformedPoint } from "../trigonometrics";
import { Rectangle } from "../interfaces/rectangle";

export class LabelObject extends ShapeObject {
    
    angle: number = 0;
    fontSize = 16;
    text: string = "select label text";
    sizeText = 0;
    constructor(x: number, y: number, text: string, fontSize?: number, angle?: number) {
        super()
        this.color=this.FgColor;
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
    override moveMouse(ctx: CanvasRenderingContext2D, event: MouseEvent) {
        const point = getTransformedPoint(ctx, event.offsetX, event.offsetY);
        this.x = point.x;
        this.y = point.y;
    }
    override inverseShape(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.BgColor;
        ctx.font = Math.abs(this.fontSize).toString() + "px Arial"
        this.sizeText = ctx.measureText(this.text).actualBoundingBoxRight+ctx.measureText(this.text).actualBoundingBoxLeft;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }

    override move(x: number, y: number): void {
        this.x=x;
        this.y=y;
    }
    
    override inPoint(x: number, y: number): boolean {
        const rect = rectangle(this.x,this.y, this.fontSize, this.sizeText, this.angle);
        return isPointInsideRectangle({ x: x, y: y }, rect.first, rect.second, rect.third, rect.forth);
    }

    override drawShape(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.font = Math.abs(this.fontSize).toString() + "px Arial"
        this.sizeText = ctx.measureText(this.text).actualBoundingBoxRight+ctx.measureText(this.text).actualBoundingBoxLeft;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }

    setAngleInGrades(grades: number) {
        this.angle = toRadians(grades);
    }
}
