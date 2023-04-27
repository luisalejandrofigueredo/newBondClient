import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { NgGdService, ConnectionObject } from 'ng-gd'
@Component({
  selector: 'app-testgdi',
  templateUrl: './testgdi.component.html',
  styleUrls: ['./testgdi.component.sass']
})
export class TestgdiComponent implements AfterViewInit, OnInit {
  gd = inject(NgGdService);
  private ctx!: CanvasRenderingContext2D;
  move = false;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  constructor() {
    this.gd.start(800,600);
    this.gd.addNode({ x: 150, y: 150 }, "uno", 10, "number one", false, 10, 10);
    this.gd.addNode({ x: 50, y: 50 }, "dos", 10, "number two", false, 10, 10);
    this.gd.addConnection({ x: 150, y: 150 }, { x: 50, y: 50 }, "#000000")
    this.gd.addLabel(70, 70, "Hola Mundo", 20, 270);
    const connect = this.gd.getItem(3);
    (connect as unknown as ConnectionObject).Name = "hello word" ;
    (connect as unknown as ConnectionObject).
  }

  ngAfterViewInit(): void {
    this.gd.clear(this.ctx);
    this.gd.draw(this.ctx);
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = "black";
    this.gd.canvasSetSize(this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  @HostListener("mousedown", ["$event"])
  async onMouseDown(event: MouseEvent) {
    if (this.gd.click(this.ctx, event).length > 0){
      console.log('click');
      this.move = true;
    }
  }

  @HostListener("mousemove", ["$event"])
  async onMouseMove(event: MouseEvent) {
    if (this.move === true) {
      this.gd.getClicks().forEach((element) => {
        if (element.shape.type!=='connection'){
          element.shape.inverseShape(this.ctx);
          element.shape.moveMouse(this.ctx, event);
          element.shape.drawShape(this.ctx);
        }
        else {
          if (element.action ==='inPointXY'){
            element.shape.inverseShape(this.ctx);
            (element.shape as ConnectionObject).moveMouseXY(this.ctx,event)
            element.shape.drawShape(this.ctx);
          }
          if (element.action ==='inPointToXY'){
            element.shape.inverseShape(this.ctx);
            (element.shape as ConnectionObject).moveMouseToXY(this.ctx,event)
            element.shape.drawShape(this.ctx);
          }
          if (element.action ==='inRectangle'){
            element.shape.inverseShape(this.ctx);
            (element.shape as ConnectionObject).moveMouse(this.ctx,event)
            element.shape.drawShape(this.ctx);
          }

        }
      });
    }
  }

  @HostListener("mouseup", ["$event"])
  async onMouseUp(event: MouseEvent) {
    if (this.move === true) {
      this.gd.clear(this.ctx);
      this.gd.draw(this.ctx)
      this.move = false;
    }
  }
}