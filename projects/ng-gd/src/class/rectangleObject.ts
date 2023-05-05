import { ShapeObject } from './shape-object'
import { rectangle,isPointInsideRectangle,getTransformedPoint, distance, angle, move } from "../trigonometrics";
export class RectangleObject extends ShapeObject {
    angle = 0;
    borderColor = "#ffffff";
    height = 10;
    width = 10;
    constructor(x: number, y: number, width: number, height: number, angle?:number,color?: string,borderColor?:string) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type="rectangle";
        if (angle){
            this.angle=angle;
        }
        if (color){
            this.color = color;
        } else {
            this.color=this.FgColor;
        }
        if (borderColor){
            this.borderColor=borderColor;
        } else {
            this.borderColor=this.FgColor;
        }
    }
    override drawShape(ctx: CanvasRenderingContext2D): void {
        const rect = rectangle(this.x, this.y, this.height, this.width, this.angle);
        ctx.fillStyle=this.color;
        ctx.strokeStyle=this.borderColor;
        ctx.beginPath();
        ctx.moveTo(rect.first.x, rect.first.y);
        ctx.lineTo(rect.second.x, rect.second.y);
        ctx.lineTo(rect.third.x, rect.third.y);
        ctx.lineTo(rect.forth.x, rect.forth.y);
        ctx.lineTo(rect.first.x, rect.first.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    override inverseShape(ctx: CanvasRenderingContext2D): void {
        const rect = rectangle(this.x, this.y, this.height, this.width, this.angle);
        ctx.fillStyle=this.BgColor;
        ctx.strokeStyle=this.BgColor;
        ctx.beginPath();
        ctx.moveTo(rect.first.x, rect.first.y);
        ctx.lineTo(rect.second.x, rect.second.y);
        ctx.lineTo(rect.third.x, rect.third.y);
        ctx.lineTo(rect.forth.x, rect.forth.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    override inPoint(x: number, y: number): boolean {
        const rect = rectangle(this.x, this.y, this.height, this.width, this.angle);
        if (isPointInsideRectangle({x:x,y:y},rect.first,rect.second,rect.third,rect.forth)){
            return true;
        }
        return false
    }
    override move(x: number, y: number): void {
        this.x=x;
        this.y=y;
    }
    override moveMouse(ctx: CanvasRenderingContext2D, event: MouseEvent): void {
        const point = getTransformedPoint(ctx, event.offsetX, event.offsetY);
        const dist=distance(this.x,this.y,point.x,point.y);
        const ang=angle(this.x,this.y,point.x,point.y);
        const pointDisplacement=move(this.x,this.y,ang,dist);
        ctx.beginPath();
        ctx.arc(pointDisplacement.x,pointDisplacement.y,5,0,2*Math.PI)
        ctx.closePath();
        ctx.stroke();
        this.x = pointDisplacement.x;
        this.y = pointDisplacement.y;
    }
}
