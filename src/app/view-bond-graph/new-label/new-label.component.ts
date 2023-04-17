import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NumberPoint } from "../../interfaces/number-point";

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
    fontSize: new FormControl<number>(0, { nonNullable: true }),
  });

  ngOnInit(): void {
    console.log('Cursor',this.cursor)    
  }
  
  onSubmit() { }

  update() { }

  cancel() { }
}
