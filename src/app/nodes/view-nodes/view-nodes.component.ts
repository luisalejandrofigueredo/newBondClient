import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/ok-cancel/dialog-data';
import { OkCancelComponent } from 'src/app/ok-cancel/ok-cancel.component';
import { LoginService } from 'src/app/services/login.service';
import { NodeService } from 'src/app/services/node.service';
import { ProjectServiceService } from 'src/app/services/project-service.service';
import { Node } from "../../interfaces/node";

@Component({
  selector: 'app-view-nodes',
  templateUrl: './view-nodes.component.html',
  styleUrls: ['./view-nodes.component.sass']
})
export class ViewNodesComponent implements OnInit {
  DataSource: MatTableDataSource<Node> = new MatTableDataSource();
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor(private location:Location,public projectService: ProjectServiceService, public dialog: MatDialog, private loginService: LoginService, private nodeService: NodeService, private router: Router) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    if (this.projectService.project !== 0) {
      this.nodeService.getNodes(this.projectService.project).then((nodes) => {
        this.DataSource.data = nodes;
        this.DataSource.paginator = this.paginator;
      });
    } else {
        this.location.back();
    }
  }

  addNode() {
    this.router.navigate(['nodes/newNode']);
  }

  nodeEdit(id: number) {
    this.router.navigate(['nodes/editNode', id])
  }

  nodeDelete(id: number, name: string) {
    const dialogRef = this.dialog.open(OkCancelComponent, {
      width: '250px',
      disableClose: true,
      enterAnimationDuration: '1000ms',
      data: { alert: true, header: "Delete", message: `You want delete the node ${name}?` } as DialogData,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nodeService.deleteNode(id).then((accept) => {
          this.refresh();
        });
      }
    });
  }

}
