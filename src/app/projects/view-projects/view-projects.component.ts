import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectServiceService } from "../../services/project-service.service";
import { LoginService } from '../../services/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from 'src/app/interfaces/project';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.sass']
})
export class ViewProjectsComponent implements OnInit {
  DataSource: MatTableDataSource<Project> = new MatTableDataSource();
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  @ViewChild(MatPaginator,{static:false}) paginator!: MatPaginator;
  constructor(public projectService: ProjectServiceService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.router.onSameUrlNavigation='reload';
    this.refresh();
  }

  refresh(){
    this.projectService.getProjects(this.loginService.id).then((projects) => {
      this.DataSource.data=projects;
      this.DataSource.paginator = this.paginator
     });
  }

  addProject() {
    this.router.navigate(['project/newProject']);
    this.refresh();
  }

  projectEdit(id: number) {
    this.router.navigate(['project/editProject',id]);
    this.refresh();
   }
  projectDelete(id: number) { }
  projectCopy(id: number) { }
  selectProject(id: number) { }
  projectConnections(id: Number) { }
  projectNodes(id:number){}

}
