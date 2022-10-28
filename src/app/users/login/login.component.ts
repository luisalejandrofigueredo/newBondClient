import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  hide!:boolean;
  loginForm = new FormGroup({
    login: new FormControl('',{nonNullable:true,validators:[Validators.required]}),
    password: new FormControl('',{nonNullable:true,validators:[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,20}'
    )]}),
  });
  constructor() { }

  ngOnInit(): void {
    this.hide=true;
  }

  onSubmit(){

  }

}
