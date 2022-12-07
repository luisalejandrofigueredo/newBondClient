import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Relations } from 'src/app/interfaces/relations';
import { ConnectionsService } from "../../services/connections.service";
import { Location } from "@angular/common";
@Component({
  selector: 'app-align-label',
  templateUrl: './align-label.component.html',
  styleUrls: ['./align-label.component.sass']
})
export class AlignLabelComponent implements OnInit {
  id!: number;
  bufferConnection!: Relations;
  alignLabelForm = new FormGroup({
    distance: new FormControl<number>(0, { nonNullable: true }),
    align: new FormControl<number>(0, { nonNullable: true }),
  });
  constructor(private location: Location, private activatedRoute: ActivatedRoute, private connectionsService: ConnectionsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.connectionsService.getConnection(this.id).then((connection) => {
        this.bufferConnection = connection;
        this.alignLabelForm.controls.distance.setValue(this.bufferConnection.distance);
        this.alignLabelForm.controls.align.setValue(this.bufferConnection.align);
      })
    });
  }

  cancel() {
    this.location.back();
  }

  onSubmit() {
    this.bufferConnection.distance=this.alignLabelForm.controls.distance.value;
    this.bufferConnection.align=this.alignLabelForm.controls.align.value;
    this.connectionsService.put(this.bufferConnection).then((connection)=>{
      this.location.back();
    });
  }
}
