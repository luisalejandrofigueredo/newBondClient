import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NodeService } from 'src/app/services/node.service';
import { Location } from "@angular/common";
@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.sass']
})
export class EditNodeComponent implements OnInit {
  id!:number;
  nodeForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    net: new FormControl<boolean>(false, { nonNullable: true })
  });
  constructor(private location:Location,private activatedRoute:ActivatedRoute,private router:Router,private loginService:LoginService,private nodeService:NodeService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.nodeService.getNode(this.loginService.id,this.id).then((node)=>{
        this.nodeForm.controls.name.setValue(node.name);
        this.nodeForm.controls.description.setValue(node.description);
        this.nodeForm.controls.net.setValue(node.net);
      }).catch((error)=> console.log('Error getting node '))
    });
  }

  onSubmit(){}

  cancel(){
    this.location.back();
  }

}
