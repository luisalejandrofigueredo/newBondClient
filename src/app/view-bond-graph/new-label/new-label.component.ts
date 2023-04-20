import { Component, EventEmitter, Inject, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NumberPoint } from "../../interfaces/number-point";
import {LabelsService  } from "../../services/labels.service";
import { ProjectServiceService } from 'src/app/services/project-service.service';
import { Labels } from 'src/app/interfaces/labels';
@Component({
  selector: 'app-new-label',
  templateUrl: './new-label.component.html',
  styleUrls: ['./new-label.component.sass']
})
export class NewLabelComponent implements OnInit {
  @Input() cursor!: NumberPoint;
  @Output() updateCanvas= new EventEmitter<boolean>();
  @Output() formClosed = new EventEmitter<boolean>();
  labelForm = new FormGroup({
    text: new FormControl<string>('', { nonNullable: true }),
    angle: new FormControl<number>(0, { nonNullable: true }),
    fontSize: new FormControl<number>(16, { nonNullable: true }),
  });
  private labelService= inject(LabelsService);
  private projectService =inject(ProjectServiceService)

  ngOnInit(): void {
    console.log('Cursor',this.cursor)    
  }
  
  onSubmit() { 
    this.labelService.add(this.projectService.project,{
      angle:this.labelForm.controls.angle.value,
      text:this.labelForm.controls.text.value,
      fontSize:this.labelForm.controls.fontSize.value,
      x:this.cursor.x,
      y:this.cursor.y,
      color:'#000000',
      id:0,
      visible:true,
    } as Labels).then((resolve)=>{
      this.formClosed.emit(true);
    })
  }

  update() { }

  cancel() { 
    this.formClosed.emit(true);
  }
}
