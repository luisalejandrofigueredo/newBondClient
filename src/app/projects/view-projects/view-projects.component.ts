import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectServiceService } from "../../services/project-service.service";
import { LoginService } from '../../services/login.service';
import {  MatTableDataSource } from '@angular/material/table';
import { Project } from 'src/app/interfaces/project';
import { MatPaginator } from '@angular/material/paginator';
import { OkCancelComponent } from "../../ok-cancel/ok-cancel.component";
import { DialogData } from "../../ok-cancel/dialog-data";
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.sass']
})
export class ViewProjectsComponent implements OnInit {
  DataSource: MatTableDataSource<Project> = new MatTableDataSource();
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor(public dialog: MatDialog, public projectService: ProjectServiceService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.router.onSameUrlNavigation = 'reload';
    this.refresh();
  }

  refresh() {
    this.projectService.getProjects(this.loginService.id).then((projects) => {
      this.DataSource.data = projects;
      this.DataSource.paginator = this.paginator
    });
  }

  addProject() {
    this.router.navigate(['project/newProject']);
  }

  projectEdit(id: number) {
    this.router.navigate(['project/editProject', id]);
  }

  projectDelete(id: number, name: string) {
    const dialogRef = this.dialog.open(OkCancelComponent, {
      width: '250px',
      disableClose: true,
      enterAnimationDuration: '1000ms',
      data: { alert: true, header: "Delete", message: `You want delete the project ${name}?` } as DialogData,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(id).then((accept) => {
          this.refresh();
        });
      }
    });
  }
  projectCopy(id: number) { }
  selectProject(id: number) { 
    this.projectService.project=id;
    localStorage.setItem('project',id.toString())
  }
  projectConnections(id: Number) { }
  projectNodes(id: number) { }

}
