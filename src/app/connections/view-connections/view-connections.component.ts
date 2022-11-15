import { Component, OnInit, ViewChild } from '@angular/core';
import { Relations } from "../../interfaces/relations";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConnectionsService } from "../../services/connections.service";
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-connections',
  templateUrl: './view-connections.component.html',
  styleUrls: ['./view-connections.component.sass']
})
export class ViewConnectionsComponent implements OnInit {
  DataSource: MatTableDataSource<Relations> = new MatTableDataSource();
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor(private router:Router,private loginService:LoginService,private connectionService:ConnectionsService) { }

  ngOnInit(): void {
    this.connectionService.getConnections(this.loginService.id).then((connections)=>{
      console.log(connections);
    })
    
  }

  addConnection(){
    this.router.navigate(['connections//add']);
  }

  connectionEdit(id:number){}

  connectionDelete(id:number,name:string){}

}
