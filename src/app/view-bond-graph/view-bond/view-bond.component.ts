import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-bond',
  templateUrl: './view-bond.component.html',
  styleUrls: ['./view-bond.component.sass']
})
export class ViewBondComponent implements OnInit {
  width=800;
  height=600;
  @ViewChild('myCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  constructor() { }


  ngOnInit(): void {
  }

  draw(){

  }

  menu(event: MouseEvent) {
    event.preventDefault();
  }

}
