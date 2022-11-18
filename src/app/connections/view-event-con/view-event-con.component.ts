import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventCon } from "../../interfaces/event-con";
@Component({
  selector: 'app-view-event-con',
  templateUrl: './view-event-con.component.html',
  styleUrls: ['./view-event-con.component.sass']
})
export class ViewEventConComponent implements OnInit {
  DataSource: MatTableDataSource<EventCon> = new MatTableDataSource();
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  viewEventsCon: EventCon[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor() { }

  ngOnInit(): void {
  }

  addEvent(){}
  eventEdit(id:number){}
  eventDelete(id:number,name:string){}

}
