import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from "./dialog-data";
@Component({
  selector: 'app-ok-cancel',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatDialogModule],
  templateUrl: './ok-cancel.component.html',
  styleUrls: ['./ok-cancel.component.sass'],
})
export class OkCancelComponent implements OnInit {
  constructor(public dialog: MatDialog,private dialogRef: MatDialogRef<OkCancelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
