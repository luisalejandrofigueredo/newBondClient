import { ShapeObject } from "./shape-object";
import { distance, getTransformedPoint } from "../trigonometrics";
export class CircleObject extends ShapeObject {
    radius = 0;
    borderColor = "";
    constructor(x: number, y: number, radius: number, color?: string, borderColor?: string) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.type="circle";
        if (color) {
            this.color = color;
        } else {
            this.color = this.FgColor
        }
        if (borderColor) {
            this.borderColor = borderColor;
        } else {
            this.borderColor = this.FgColor;
        }
    }
    override drawShape(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.borderColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    override inverseShape(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.BgColor;
        ctx.strokeStyle = this.BgColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    override inPoint(x: number, y: number): boolean {
        if (distance(this.x, this.y, x, y) < this.radius) {
            return true;
        }
        return false;
    }
    override move(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
    override moveMouse(ctx: CanvasRenderingContext2D, event: MouseEvent): void {
        const point = getTransformedPoint(ctx, event.offsetX, event.offsetY);
        if (ShapeObject.lastMove.x!==0 && ShapeObject.lastMove.y!==0){
            const deltaX=point.x-ShapeObject.lastMove.x;
            const deltaY=point.y-ShapeObject.lastMove.y;
            this.x+=deltaX;
            this.y+=deltaY;
        }
        ShapeObject.lastMove=point;
    }
}
