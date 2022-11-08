import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-new-node',
  templateUrl: './new-node.component.html',
  styleUrls: ['./new-node.component.sass']
})
export class NewNodeComponent implements OnInit {
  nodeForm = new FormGroup({
    name: new FormControl<string>('',{nonNullable:true,validators:[Validators.required]}),
    description: new FormControl<string>('',{nonNullable:true}),
    net: new FormControl<boolean>(false)
  });
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
