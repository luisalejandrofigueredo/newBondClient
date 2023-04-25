import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import {NgGdService,ConnectionObject} from 'ng-gd'
@Component({
  selector: 'app-testgdi',
  templateUrl: './testgdi.component.html',
  styleUrls: ['./testgdi.component.sass']
})
export class TestgdiComponent implements AfterViewInit,OnInit {
  gd = inject(NgGdService);
  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  constructor(){
    this.gd.addNode({x:150,y:150},"uno",10,"number one",false,10,10);
    this.gd.addNode({x:50,y:50},"dos",10,"number two",false,10,10);
    this.gd.addConnection({x:150,y:150},{x:50,y:50},"#000000")
    this.gd.addLabel(70,70,"Hola Mundo",20,270);
    const connect=this.gd.getItem(3);
    (connect as unknown as ConnectionObject).Name="hello word connection";
  }
  ngAfterViewInit(): void {
    this.gd.draw(this.ctx);
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;  
  }
}
