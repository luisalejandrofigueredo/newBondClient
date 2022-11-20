import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { EventCon } from "../../interfaces/event-con";
import { EventsConService } from "../../services/events-con.service";
@Component({
  selector: 'app-view-event-con',
  templateUrl: './view-event-con.component.html',
  styleUrls: ['./view-event-con.component.sass']
})
export class ViewEventConComponent implements OnInit {
  @Input() id=0;
  DataSource: MatTableDataSource<EventCon> = new MatTableDataSource();
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  viewEventsCon: EventCon[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor(private loginService:LoginService ,private eventConService:EventsConService ,private router:Router) { }
  ngOnInit(): void {
    this.eventConService.getAll(this.id).then((eventsCon)=>{
      this.DataSource.data=eventsCon;
      this.DataSource.paginator=this.paginator;
    });
  }

  refresh(){
    this.eventConService.getAll(this.id).then((eventsCon)=>{
      this.DataSource.data=eventsCon;
      this.DataSource.paginator=this.paginator;
    });

  }

  addEvent(){
    this.router.navigate(['connections/addEvent',this.id])
   }
  eventEdit(id:number){
  }
  eventDelete(id:number,name:string){}

}
