import { Component, OnInit, ViewChild } from '@angular/core';
import { Relations } from "../../interfaces/relations";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  constructor() { }

  ngOnInit(): void {
  }

  addConnection(){}

  connectionEdit(id:number){}

  connectionDelete(id:number,name:string){}

}
