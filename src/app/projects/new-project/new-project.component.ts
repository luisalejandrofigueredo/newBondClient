import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.sass']
})
export class NewProjectComponent implements OnInit {
  projectForm = new FormGroup({
    name: new FormControl('',{nonNullable:true,validators:[Validators.required]}),
    description: new FormControl('',{nonNullable:true}),
  });
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    
  }

}
