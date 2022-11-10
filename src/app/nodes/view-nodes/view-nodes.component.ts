import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/ok-cancel/dialog-data';
import { OkCancelComponent } from 'src/app/ok-cancel/ok-cancel.component';
import { LoginService } from 'src/app/services/login.service';
import { NodeService } from 'src/app/services/node.service';
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
  constructor(public dialog: MatDialog,private loginService:LoginService,private nodeService:NodeService,private router:Router) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.nodeService.getNodes(this.loginService.id).then((nodes)=>{
      this.DataSource.data=nodes;
      this.DataSource.paginator=this.paginator;
    });
  }

  addNode(){
    this.router.navigate(['nodes/newNode']);
  }

  nodeEdit(id:number){
    this.router.navigate(['nodes/editNode',id])
  }

  nodeDelete(id:number,name:string){
    const dialogRef = this.dialog.open(OkCancelComponent, {
      width: '250px',
      disableClose:true,
      enterAnimationDuration:'1000ms',
      data: { header: "Delete", message: `You want delete the node ${name}?` } as DialogData,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nodeService.deleteNode(id).then((accept)=>{
          this.refresh();
        });
      }
    });
  }

}
