import { ShapeObject } from "ng-gd";

export class DocumentObject extends ShapeObject{

    constructor(width:number,height:number){
        super();
        ShapeObject.width=width;
        ShapeObject.height=height;
        this.type="Document"
    }    
    override drawShape(ctx: CanvasRenderingContext2D): void {
    }
    override inverseShape(ctx: CanvasRenderingContext2D): void {
    }
    override inPoint(x: number, y: number): boolean {
        return false;
    }
    override move(x: number, y: number): void {
    }
    override moveMouse(ctx: CanvasRenderingContext2D, event: MouseEvent): void {   
    }
    setSize(width:number,height:number){
        ShapeObject.width=width;
        ShapeObject.height=height;
    }
}
