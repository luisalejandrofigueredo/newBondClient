import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { ProjectServiceService } from "../../services/project-service.service";
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.sass']
})
export class NewProjectComponent implements OnInit {
  projectForm = new FormGroup({
    name: new FormControl<string>('',{nonNullable:true,validators:[Validators.required]}),
    description: new FormControl<string>('',{nonNullable:true}),
  });
  constructor(private location:Location,private matSnackBar:MatSnackBar, private loginService:LoginService,private projectService:ProjectServiceService,) { }

  ngOnInit(): void {
  }

  async onSubmit(){
    await this.projectService.addProject(this.loginService.id,{ name:this.projectForm.controls.name.value,description:this.projectForm.controls.description.value}).then((accept)=>{
      this.matSnackBar.open('Project created','Create',{duration:3000});
      this.location.back();
    }).catch((reject)=>{this.matSnackBar.open('Error retry or talk with administrator','Create',{duration:3000})})
  }

  cancel(){
    this.matSnackBar.open('Canceled by user','Create',{duration:3000})
    this.location.back();
  }
}
