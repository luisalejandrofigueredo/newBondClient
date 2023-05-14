import { ShapeObject } from "./shape-object";
import { distance, toRadians, move, fillCircle, getTransformedPoint } from "../trigonometrics";
export class NodeObject extends ShapeObject {
    description!: string;
    net: boolean = false;
    angleLabel: number = 0;
    distanceLabel: number = 10;
    radius: number = 10;
    constructor(x: number, y: number, name: string, radius: number, description?: string, net?: boolean, angleLabel?: number, distanceLabel?: number) {
        super();
        this.x = x;
        this.y = y;
        this.name = name;
        this.type = 'node';
        this.radius = radius;
        if (description) {
            this.description = description;
        }
        if (net) {
            this.net = net;
        }
        if (angleLabel) {
            this.angleLabel = angleLabel;
        }
        if (distanceLabel) {
            this.distanceLabel = distanceLabel;
        }
    }
    override moveMouse(ctx: CanvasRenderingContext2D, event: MouseEvent) {
        const point = getTransformedPoint(ctx, event.offsetX, event.offsetY);
        if (ShapeObject.lastMove.x!==0 && ShapeObject.lastMove.y!==0){
            const deltaX=point.x-ShapeObject.lastMove.x;
            const deltaY=point.y-ShapeObject.lastMove.y;
            this.x+=deltaX;
            this.y+=deltaY;
        }
        ShapeObject.lastMove=point;
    }

    override move(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    override inverseShape(ctx: CanvasRenderingContext2D): void {
        const path = new Path2D();
        const movePos = move(this.x, this.y, toRadians(this.angleLabel), this.distanceLabel);
        ctx.font = "16px Arial"
        ctx.fillStyle = this.BgColor;
        ctx.strokeStyle = this.BgColor;
        ctx.fillText(this.name, movePos.x, movePos.y);
        fillCircle(ctx, this.x, this.y, this.radius, this.BgColor);
        ctx.lineWidth = 1
    }

    override drawShape(ctx: CanvasRenderingContext2D): void {
        if (this.visible === true) {
            const path = new Path2D();
            const movePos = move(this.x, this.y, toRadians(this.angleLabel), this.distanceLabel);
            ctx.font = "16px Arial"
            ctx.fillStyle = this.FgColor;
            ctx.strokeStyle = this.FgColor;
            ctx.fillText(this.name, movePos.x, movePos.y);
            fillCircle(ctx, this.x, this.y, this.radius, this.color);
            ctx.lineWidth = 1
            if (this.net === true) {
                ctx.fillStyle = this.Color;
                ctx.strokeStyle = this.Color;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill()
            }
        }
    }

    override inPoint(x: number, y: number): boolean {
        if (distance(this.x, this.y, x, y) <= this.radius) {
            return true;
        }
        else {
            return false;
        }
    }
}
