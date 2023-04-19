import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Labels } from 'src/app/interfaces/labels';
import { NumberPoint } from 'src/app/interfaces/number-point';
import { LabelsService } from 'src/app/services/labels.service';
import { ProjectServiceService } from 'src/app/services/project-service.service';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.sass']
})
export class EditLabelComponent implements OnInit {
  @Input() label!: Labels;
  @Output() updateCanvas = new EventEmitter<boolean>();
  @Output() formClosed = new EventEmitter<boolean>();
  labelForm = new FormGroup({
    text: new FormControl<string>('', { nonNullable: true }),
    angle: new FormControl<number>(0, { nonNullable: true }),
    fontSize: new FormControl<number>(0, { nonNullable: true }),
  });
  private labelService = inject(LabelsService);
  private projectService = inject(ProjectServiceService)

  ngOnInit(): void {
    this.labelForm.controls.angle.setValue(this.label.angle);
    this.labelForm.controls.text.setValue(this.label.text);
    this.labelForm.controls.fontSize.setValue(this.label.fontSize);
  }

  onSubmit() {
    this.labelService.put({
      angle: this.labelForm.controls.angle.value,
      text: this.labelForm.controls.text.value,
      fontSize: this.labelForm.controls.fontSize.value,
      x: this.label.x,
      y: this.label.y,
      color: this.label.color,
      id: this.label.id,
      visible: this.label.visible,
    } as Labels).then((resolve) => {
      this.formClosed.emit(true);
    })
  }
  update(){
    this.labelService.put({
      angle: this.labelForm.controls.angle.value,
      text: this.labelForm.controls.text.value,
      fontSize: this.labelForm.controls.fontSize.value,
      x: this.label.x,
      y: this.label.y,
      color: this.label.color,
      id: this.label.id,
      visible: this.label.visible,
    } as Labels).then((resolve) => {
      this.updateCanvas.emit(true);
    })
  }

  cancel(){}
}
