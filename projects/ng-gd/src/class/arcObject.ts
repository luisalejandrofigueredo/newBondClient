import { ShapeObject } from "./shape-object";
import { distance, move, toRadians, angle, toDegrees, getTransformedPoint } from '../trigonometrics';
export class ArcObject extends ShapeObject {
    size: number = 0;
    beginGrades: number = 0;
    endGrades: number = 0;
    borderColor = "";
    constructor(x: number, y: number, size: number, beginGrades: number, endGrades: number, color?: string, borderColor?: string) {
        super();
        this.x = x;
        this.y = y;
        this.size = size;
        this.beginGrades = beginGrades;
        this.endGrades = endGrades;
        this.type = "arc";
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
        const beginRadians = toRadians(this.beginGrades);
        const endRadians = toRadians(this.endGrades);
        const line = move(this.x, this.y, beginRadians,this.size);
        ctx.strokeStyle = this.borderColor;
        ctx.fillStyle = this.color;
        ctx.beginPath()
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(line.x, line.y);
        ctx.arc(this.x, this.y, this.size,beginRadians, endRadians);
        ctx.lineTo(this.x,this.y);
        ctx.closePath();
        ctx.fill();
    }
    override inverseShape(ctx: CanvasRenderingContext2D): void {
        const beginRadians = toRadians(this.beginGrades);
        const endRadians = toRadians(this.endGrades);
        const line = move(this.x, this.y, beginRadians,this.size);
        ctx.strokeStyle = this.BgColor;
        ctx.fillStyle = this.BgColor;
        ctx.beginPath()
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(line.x, line.y);
        ctx.arc(this.x, this.y, this.size,beginRadians, endRadians);
        ctx.lineTo(this.x,this.y);
        ctx.closePath();
        ctx.fill();
    }
    override inPoint(x: number, y: number): boolean {
        let anglePoint = angle(this.x, this.y, x, y);
        if (anglePoint < 0) {
            anglePoint = Math.PI * 2 + anglePoint;
          }
        if (distance(x, y, this.x, this.y) < this.size && anglePoint >= toRadians(this.beginGrades) && anglePoint <= toRadians(this.endGrades)) {
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
        if (ShapeObject.lastMove.x !== 0 && ShapeObject.lastMove.y !== 0) {
            const deltaX = point.x - ShapeObject.lastMove.x;
            const deltaY = point.y - ShapeObject.lastMove.y;
            this.x += deltaX;
            this.y += deltaY;
        }
        ShapeObject.lastMove = point;
    }
}

