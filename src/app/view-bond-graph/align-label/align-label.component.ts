import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() id: number = 0;
  @Output() updateCanvas = new EventEmitter<boolean>();
  @Output() formClosed = new EventEmitter<boolean>();
  bufferConnection!: Relations;
  updateConnection!: Relations;
  alignLabelForm = new FormGroup({
    distance: new FormControl<number>(0, { nonNullable: true }),
    align: new FormControl<number>(0, { nonNullable: true }),
  });
  constructor(private location: Location, private activatedRoute: ActivatedRoute, private connectionsService: ConnectionsService) { }

  ngOnInit(): void {
    this.connectionsService.getConnection(this.id).then((connection) => {
      this.bufferConnection = connection;
      this.updateConnection = {
        id: connection.id, align: connection.align, color: connection.color
        , description: connection.description, distance: connection.distance, from: connection.from,
        mirrorLabel: connection.mirrorLabel, name: connection.name, project: connection.project, to: connection.to
      ,eventCones:connection.eventCones} as Relations;
      this.alignLabelForm.controls.distance.setValue(this.bufferConnection.distance);
      this.alignLabelForm.controls.align.setValue(this.bufferConnection.align);
    })
  }

  changeValue(event: number) {
    this.updateConnection.distance = this.alignLabelForm.controls.distance.value;
    this.updateConnection.align = this.alignLabelForm.controls.align.value
    this.connectionsService.put(this.updateConnection).then((connection) => {
      this.updateCanvas.emit(true);
    });
  }

  cancel() {
    this.connectionsService.put(this.bufferConnection).then((connection) => {
      this.formClosed.emit(true);
    });
  }

  onSubmit() {
    this.bufferConnection.distance = this.alignLabelForm.controls.distance.value;
    this.bufferConnection.align = this.alignLabelForm.controls.align.value;
    this.connectionsService.put(this.bufferConnection).then((connection) => {
      this.formClosed.emit(true);
    });
  }
}
