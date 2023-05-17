import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { NgGdService, ConnectionObject, Point, LabelObject, NodeObject, LineObject, ShapeObject } from 'ng-gd'



@Component({
  selector: 'app-testgdi',
  templateUrl: './testgdi.component.html',
  styleUrls: ['./testgdi.component.sass']
})
export class TestgdiComponent implements AfterViewInit, OnInit {
  gd = inject(NgGdService);
  private ctx!: CanvasRenderingContext2D;
  move = false;
  id = 1;
  drag: boolean = false;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  dragStartPosition: Point = { x: 0, y: 0 };
  constructor() {
    this.gd.start(800, 600);
    this.gd.setDarkMode();
    /* this.gd.addNode({ x: 150, y: 150 }, "one", "one", false, 10, 10);
    this.gd.addNode({ x: 50, y: 50 }, "two", "two", false, 10, 10);
    this.gd.addConnection({ x: 150, y: 150 }, { x: 50, y: 50 }, "#ff0000")
    this.gd.addLabel({ x: 200, y: 200 } as Point, "Hola Mundo", 20, 270);
    this.gd.addRectangle({ x: 100, y: 100 }, 50, 50, 10, "#0000ff", "#ff0000");
    this.gd.addCircle({ x: 80, y: 80 }, 10, "#00ff00", "#ff0000");
    this.gd.addTriangle({ x: 90, y: 90 }, { x: 100, y: 110 }, { x: 120, y: 120 }, "#00ff00", "#0000ff");
    this.gd.addMultiplesSides({ x: 180, y: 180 }, 6, 20, "#0000ff","#0000ff",10);
    this.gd.addLine({x:100,y:100},{x:150,y:150},3); */
    
    
    /* const connect = this.gd.castingConnection(3);
    connect.Name = "hello word";
    connect.MirrorLabel = true;
    const label = this.gd.getItem(4);
    (label as unknown as LabelObject).font = "Arial"
    const node2 = this.gd.casting(2);
    if (node2 instanceof NodeObject) {
      node2.name = "Dos";
    } */
  }
  
  renumber(){
    this.gd.renumberZOrder();
  }
  
  acceptToFront() {
    (this.gd.casting(this.id) as unknown as ShapeObject ).toFront()
    console.log('To Front',this.gd.casting(this.id) as ShapeObject,this.id);
  }
  
  listNodes(){
    console.log('Objects',this.gd.canvasObjects);
    
  }
  
  ngAfterViewInit(): void {
    this.gd.clear(this.ctx);
    this.gd.draw(this.ctx);
  }
  
  async ngOnInit(): Promise<void> {
    const colors = ["#ff0000", "#ff00ff", "#0000ff", "#ffff00", "#f0000f"]
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = "black";
    this.gd.canvasSetSize(this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    /* for (let index = 0; index < 5; index++) {
      this.gd.addRectangle({ x: 50 + index * 10, y: 250 + index * 20 }, 100, 100, 0, colors[index]).toFront();
    } */
    this.gd.addPieChart(this.ctx,{x:200,y:200},40,[180,160,20],["#ff0000","#0000ff","#00ff00"],0);

    /* for (let index = 0; index < 100; index++) {
      await this.wait();
    } */
  }


  wait() {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const indexObject = Math.floor(Math.random() * 5) + 1;
        const toFoB = Math.floor(Math.random() * 2) + 1;
        if (toFoB === 1) {
          this.gd.castingRectangle(indexObject).nextZOrder();
        } else {
          this.gd.castingRectangle(indexObject).backZOrder();
        }
        this.gd.clear(this.ctx);
        this.gd.draw(this.ctx);
        resolve();
      }, 1000);
    });
  }


  @HostListener("mousedown", ["$event"])
  async onMouseDown(event: MouseEvent) {
    if (this.gd.click(this.ctx, event).length > 0) {
      this.move = true;
    } else {
      this.drag = true;
      this.dragStartPosition = this.gd.getMousePoint(this.ctx, event.offsetX, event.offsetY);
    }
  }

  @HostListener("mousemove", ["$event"])
  async onMouseMove(event: MouseEvent) {
    if (this.move === true) {
      this.gd.getClicks().forEach((element) => {
        if (element.shape.type !== 'connection' && element.shape.type !== 'line') {
          element.shape.inverseShape(this.ctx);
          element.shape.moveMouse(this.ctx, event);
          element.shape.drawShape(this.ctx);
        } else {
          if (element.shape.type === 'connection') {
            if (element.action === 'inPointXY') {
              element.shape.inverseShape(this.ctx);
              (element.shape as ConnectionObject).moveMouseXY(this.ctx, event)
              element.shape.drawShape(this.ctx);
            }
            if (element.action === 'inPointToXY') {
              element.shape.inverseShape(this.ctx);
              (element.shape as ConnectionObject).moveMouseToXY(this.ctx, event)
              element.shape.drawShape(this.ctx);
            }
            if (element.action === 'inRectangle') {
              element.shape.inverseShape(this.ctx);
              (element.shape as ConnectionObject).moveMouse(this.ctx, event)
              element.shape.drawShape(this.ctx);
            }
          }
          else {
            if (element.action === 'inPointXY') {
              element.shape.inverseShape(this.ctx);
              (element.shape as LineObject).moveMouseXY(this.ctx, event)
              element.shape.drawShape(this.ctx);
            }
            if (element.action === 'inPointToXY') {
              element.shape.inverseShape(this.ctx);
              (element.shape as LineObject).moveMouseToXY(this.ctx, event)
              element.shape.drawShape(this.ctx);
            }
            if (element.action === 'inRectangle') {
              element.shape.inverseShape(this.ctx);
              (element.shape as LineObject).moveMouse(this.ctx, event)
              element.shape.drawShape(this.ctx);
            }
          }
        }
      });
    } else {
      if (this.drag === true) {
        const currentTransformedCursor = this.gd.getMousePoint(this.ctx, event.offsetX, event.offsetY);
        this.ctx.translate(currentTransformedCursor.x - this.dragStartPosition.x, currentTransformedCursor.y - this.dragStartPosition.y);
        this.gd.clear(this.ctx);
        this.gd.draw(this.ctx);
      }
    }
  }

  @HostListener("mouseup", ["$event"])
  async onMouseUp(event: MouseEvent) {
    if (this.move === true || this.drag === true) {
      this.gd.clear(this.ctx);
      this.gd.draw(this.ctx);
      this.gd.resetMouse();
      this.move = false;
      this.drag = false;
    }
  }

  @HostListener("mousewheel", ["$event"])
  zoomWheel(event: WheelEvent) {
    event.preventDefault();
    const mouse = this.gd.getMousePoint(this.ctx, event.offsetX, event.offsetY);
    const zoom = event.deltaY < 0 ? 1.1 : 0.9;
    this.gd.zoomInPoint(this.ctx, mouse.x, mouse.y, zoom);
    this.gd.clear(this.ctx);
    this.gd.draw(this.ctx);
  }
}
