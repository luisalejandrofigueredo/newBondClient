import { ShapeObject } from "./shape-object";


export class DocumentObject extends ShapeObject{

    constructor(width:number,height:number){
        super();
        ShapeObject.width=width;
        ShapeObject.height=height;
        this.type="Document"
    }    
    override drawShape(ctx: CanvasRenderingContext2D): void {
    }
    inverseShape(ctx: CanvasRenderingContext2D): void {
    }
    override inPoint(x: number, y: number): boolean {
        return false;
    }
    override move(x: number, y: number): void {
    }
    moveMouse(ctx: CanvasRenderingContext2D, event: MouseEvent): void {   
    }
    setSize(width:number,height:number){
        ShapeObject.width=width;
        ShapeObject.height=height;
    }
}
