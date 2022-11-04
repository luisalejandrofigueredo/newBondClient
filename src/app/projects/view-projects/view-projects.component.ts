import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.sass']
})
export class ViewProjectsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  addProject(){
    this.router.navigate(['project/newProject']);
  }

}
