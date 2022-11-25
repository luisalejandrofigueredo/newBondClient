import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Node } from "../../interfaces/node";
import { NodeService } from 'src/app/services/node.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-view-bond',
  templateUrl: './view-bond.component.html',
  styleUrls: ['./view-bond.component.sass']
})
export class ViewBondComponent implements OnInit {
  width = 800;
  height = 600;
  @ViewChild('myCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  constructor(private nodeService:NodeService,private loginService:LoginService) { }


  ngOnInit(): void {
  }

  drawConnections(){

  }

  drawNodes() {
    this.nodeService.getNodes(this.loginService.id)

  }

  menu(event: MouseEvent) {
    event.preventDefault();
  }

}
