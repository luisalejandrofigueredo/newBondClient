import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-nodes',
  templateUrl: './view-nodes.component.html',
  styleUrls: ['./view-nodes.component.sass']
})
export class ViewNodesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  addNode(){
    this.router.navigate(['nodes/newNode']);
  }

}
