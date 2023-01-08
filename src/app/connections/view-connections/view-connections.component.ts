import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { Relations } from "../../interfaces/relations";
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { ConnectionsService } from "../../services/connections.service";
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ViewConnections } from "../../interfaces/view-connections";
import { MatDialog } from '@angular/material/dialog';
import { OkCancelComponent } from 'src/app/ok-cancel/ok-cancel.component';
import { DialogData } from 'src/app/ok-cancel/dialog-data';
import { ProjectServiceService } from 'src/app/services/project-service.service';

@Component({
  selector: 'app-view-connections',
  templateUrl: './view-connections.component.html',
  styleUrls: ['./view-connections.component.sass']
})
export class ViewConnectionsComponent implements OnInit {
  DataSource: MatTableDataSource<ViewConnections> = new MatTableDataSource();
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  viewConnections: ViewConnections[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor(public location:Location ,public projectService:ProjectServiceService,public dialog: MatDialog, private router: Router, private loginService: LoginService, private connectionService: ConnectionsService) { }

  ngOnInit(): void {
    if (this.projectService.project===0){
      this.location.back();
    }
    this.connectionService.getConnections(this.projectService.project).then((connections) => {
      connections.forEach(element => {
        this.viewConnections.push({
          id: element.id!,
          name: element.name,
          description: element.description,
          node: element.from.name,
          nodeColor: element.from.color,
          toNode: element.to.name,
          toNodeColor: element.to.color
        });
      });
      this.DataSource.data = this.viewConnections;
      this.DataSource.paginator = this.paginator;
    });
  }

  refresh() {
    this.viewConnections=[];
    this.connectionService.getConnections(this.projectService.project).then((connections) => {
      connections.forEach(element => {
        this.viewConnections.push({
          id: element.id!,
          name: element.name,
          description: element.description,
          node: element.from.name,
          nodeColor: element.from.color,
          toNode: element.to.name,
          toNodeColor: element.to.color
        });
      });
      this.DataSource.data = this.viewConnections;
      this.DataSource.paginator = this.paginator;
    });
  }

  addConnection() {
    this.router.navigate(['connections//add']);
  }

  connectionEdit(id: number) {
    this.router.navigate(['connections//edit', id])
  }

  connectionDelete(id: number, name: string) {
    const dialogRef = this.dialog.open(OkCancelComponent, {
      width: '250px',
      disableClose: true,
      enterAnimationDuration: '1000ms',
      data: { alert: true, header: "Delete", message: `You want delete the connection ${name}?` } as DialogData,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.connectionService.deleteRelation(id).then((accept) => {
          this.refresh();
        });
      }
    });
  }
}
