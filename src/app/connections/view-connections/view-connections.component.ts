import { Component, OnInit, ViewChild } from '@angular/core';
import { Relations } from "../../interfaces/relations";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConnectionsService } from "../../services/connections.service";
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ViewConnections } from "../../interfaces/view-connections";

@Component({
  selector: 'app-view-connections',
  templateUrl: './view-connections.component.html',
  styleUrls: ['./view-connections.component.sass']
})
export class ViewConnectionsComponent implements OnInit {
  DataSource: MatTableDataSource<ViewConnections> = new MatTableDataSource();
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  viewConnections:ViewConnections[]=[];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor(private router:Router,private loginService:LoginService,private connectionService:ConnectionsService) { }

  ngOnInit(): void {
    this.connectionService.getConnections(this.loginService.id).then((connections)=>{
      connections.forEach(element => {
        this.viewConnections.push({
          id:element.id!,
          name:element.name,
          description:element.description,
          node:element.from.name,
          nodeColor:element.from.color,
          toNode:element.to.name,
          toNodeColor:element.to.color
        });
      });
      this.DataSource.data=this.viewConnections;
      this.DataSource.paginator=this.paginator;
    });
  }

  addConnection(){
    this.router.navigate(['connections//add']);
  }

  connectionEdit(id:number){
    this.router.navigate(['connections//edit',id])
  }

  connectionDelete(id:number,name:string){}

}
