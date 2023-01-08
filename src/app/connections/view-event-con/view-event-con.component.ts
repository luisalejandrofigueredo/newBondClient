import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import {  MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/ok-cancel/dialog-data';
import { OkCancelComponent } from 'src/app/ok-cancel/ok-cancel.component';
import { LoginService } from 'src/app/services/login.service';
import { EventCon } from "../../interfaces/event-con";
import { EventsConService } from "../../services/events-con.service";
@Component({
  selector: 'app-view-event-con',
  templateUrl: './view-event-con.component.html',
  styleUrls: ['./view-event-con.component.sass']
})
export class ViewEventConComponent implements OnInit {
  @Input() id = 0;
  @Output() modified = new EventEmitter<boolean>();
  DataSource: MatTableDataSource<EventCon> = new MatTableDataSource();
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  viewEventsCon: EventCon[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor(private dialog: MatDialog, private loginService: LoginService, private eventConService: EventsConService, private router: Router) { }
  ngOnInit(): void {
    this.eventConService.getAll(this.id).then((eventsCon) => {
      this.DataSource.data = eventsCon;
      this.DataSource.paginator = this.paginator;
    });
  }

  refresh() {
    this.eventConService.getAll(this.id).then((eventsCon) => {
      this.DataSource.data = eventsCon;
      this.DataSource.paginator = this.paginator;
    });

  }

  addEvent() {
    this.modified.emit(true);
    this.router.navigate(['connections/addEvent', this.id])
  }
  eventEdit(id: number) {
    this.modified.emit(true);
    this.router.navigate(['connections/editEvent', id])
  }

  eventDelete(id: number, name: string) {
    const dialogRef = this.dialog.open(OkCancelComponent, {
      width: '250px',
      disableClose: true,
      enterAnimationDuration: '1000ms',
      data: { alert: true, header: "Delete", message: `You want delete the node ${name}?` } as DialogData,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventConService.delete(id).then((accept) => {
          this.refresh();
        });
      }
    });
  }

}
