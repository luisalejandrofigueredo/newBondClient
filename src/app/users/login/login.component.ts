import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  hide!:boolean;
  loginForm = new FormGroup({
    login: new FormControl('',{nonNullable:true}),
    password: new FormControl('',{nonNullable:true}),
  });
  constructor() { }

  ngOnInit(): void {
    this.hide=true;
  }

  onSubmit(){
    
  }

}
