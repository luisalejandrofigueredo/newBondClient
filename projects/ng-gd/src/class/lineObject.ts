import { angle, distance, getNewParallelPoint, getTransformedPoint, isPointInsideRectangle, move, rectangle, translateLineToNewPosition } from '../trigonometrics';
import { ShapeObject } from './shape-object'
export class LineObject extends ShapeObject {
    toX: number;
    toY: number;
    steps:number=0;
    constructor(x: number, y: number, toX: number, toY: number, steps?:number,color?: string) {
        super();
        this.x = x;
        this.y = y;
        this.toX = toX;
        this.toY = toY;
        this.type = 'line';
        if (steps){
            this.steps=steps;
        }
        if (color !== undefined) {
            this.color = color;
        } else {
            this.color = this.FgColor;
        }
    }
    override drawShape(ctx: CanvasRenderingContext2D): void {
        if (this.visible === true) {
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            const nodeAngle = angle(this.x, this.y, this.toX, this.toY);
            const toNodeAngle = angle(this.toX, this.toY, this.x, this.y);
            const dist = distance(this.x,this.y, this.toX, this.toY);
            const rect = rectangle(this.x, this.y, 2, dist, nodeAngle);
            ctx.beginPath();
            ctx.moveTo(rect.first.x, rect.first.y);
            ctx.lineTo(rect.second.x, rect.second.y);
            ctx.lineTo(rect.third.x, rect.third.y);
            ctx.lineTo(rect.forth.x, rect.forth.y);
            ctx.lineTo(rect.first.x, rect.first.y);
            ctx.closePath();
            ctx.fill();
            const stepsPoint=dist/this.steps;
            for (let index = 0; index <= this.steps; index++) {
                const parPoint=getNewParallelPoint(this.x, this.y, this.toX, this.toY, stepsPoint*index , 1);
                const secParPoint=move(parPoint.x,parPoint.y,nodeAngle-Math.PI/2,5);
                ctx.beginPath();
                ctx.moveTo(parPoint.x,parPoint.y);
                ctx.lineTo(secParPoint.x,secParPoint.y);
                ctx.stroke();
            }
        }
    }
    override inverseShape(ctx: CanvasRenderingContext2D): void {

         ctx.fillStyle = this.BgColor;
        ctx.strokeStyle = this.BgColor;
        const nodeAngle = angle(this.x, this.y, this.toX, this.toY);
        const toNodeAngle = angle(this.toX, this.toY, this.x, this.y);
        let moveNode = move(this.x, this.y, nodeAngle, 30);
        let moveToNode = move(this.toX, this.toY, toNodeAngle, 30);
        const dist = distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y);
        const rect = rectangle(moveNode.x, moveNode.y, 2, dist, nodeAngle);
        ctx.beginPath();
        ctx.moveTo(rect.first.x, rect.first.y);
        ctx.lineTo(rect.second.x, rect.second.y);
        ctx.lineTo(rect.third.x, rect.third.y);
        ctx.lineTo(rect.forth.x, rect.forth.y);
        ctx.lineTo(rect.first.x, rect.first.y);
        ctx.closePath();
        ctx.fill();
    }
    override inPoint(x: number, y: number): boolean {
        const nodeAngle = angle(this.x, this.y, this.toX, this.toY);
        const toNodeAngle = angle(this.toX, this.toY, this.x, this.y);
        let moveNode = move(this.x, this.y, nodeAngle, 30);
        let moveToNode = move(this.toX, this.toY, toNodeAngle, 30);
        if (distance(x, y, moveNode.x, moveNode.y) <= 4) {
            return true;
        }
        if (distance(x, y, moveToNode.x, moveToNode.y) <= 4) {
            return true;
        }
        const rectangleArea = rectangle(moveNode.x, moveNode.y, 2, distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y), nodeAngle)
        if (isPointInsideRectangle({ x: x, y: y }, rectangleArea.first, rectangleArea.second, rectangleArea.third, rectangleArea.forth)) {
            return true
        }
        return false;
    }

    inPointXY(x: number, y: number): boolean {
        if (distance(x, y, this.x, this.y) <= 4) {
            return true;
        }
        return false;
    }

    inPointToXY(x: number, y: number): boolean {
        if (distance(x, y, this.toX, this.toY) <= 4) {
            return true;
        }
        return false;
    }
    inRectangle(x: number, y: number): boolean {
        const nodeAngle = angle(this.x, this.y, this.toX, this.toY);
        const toNodeAngle = angle(this.toX, this.toY, this.x, this.y);
        let moveNode = move(this.x, this.y, nodeAngle, 40);
        let moveToNode = move(this.toX, this.toY, toNodeAngle, 40);
        const rectangleArea = rectangle(moveNode.x, moveNode.y, 2, distance(moveNode.x, moveNode.y, moveToNode.x, moveToNode.y), nodeAngle)
        if (isPointInsideRectangle({ x: x, y: y }, rectangleArea.first, rectangleArea.second, rectangleArea.third, rectangleArea.forth)) {
          return true;
        }
        return false;
      }
    override move(x: number, y: number): void {
        const point = translateLineToNewPosition({ x: this.x, y: this.y }, { x: this.toX, y: this.toY }, { x: x, y: y });
        this.x = point.newPointA.x;
        this.y = point.newPointA.y;
        this.toX = point.newPointB.x;
        this.toY = point.newPointB.y;
    }
    override moveMouse(ctx: CanvasRenderingContext2D, event: MouseEvent): void {
        const point = getTransformedPoint(ctx, event.offsetX, event.offsetY);
        this.move(point.x, point.y)
    }

    moveMouseXY(ctx: CanvasRenderingContext2D, event: MouseEvent) {
        const point = getTransformedPoint(ctx, event.offsetX, event.offsetY);
        this.x = point.x;
        this.y = point.y;
    }

    moveMouseToXY(ctx: CanvasRenderingContext2D, event: MouseEvent) {
        const point = getTransformedPoint(ctx, event.offsetX, event.offsetY);
        this.toX = point.x;
        this.toY = point.y;
    }
}
