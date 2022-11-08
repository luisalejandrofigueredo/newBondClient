import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { NodeService } from "../../services/node.service";
@Component({
  selector: 'app-new-node',
  templateUrl: './new-node.component.html',
  styleUrls: ['./new-node.component.sass']
})
export class NewNodeComponent implements OnInit {
  nodeForm = new FormGroup({
    name: new FormControl<string>('',{nonNullable:true,validators:[Validators.required]}),
    description: new FormControl<string>('',{nonNullable:true}),
    net: new FormControl<boolean>(false,{nonNullable:true})
  });
  constructor(private location:Location ,private nodeService:NodeService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.nodeService.add({name:this.nodeForm.controls.name.value,description:this.nodeForm.controls.description.value,x:100,y:100,net:this.nodeForm.controls.net.value,visible:true}).then((accept)=>{
      this.location.back();
    })
  }
}
