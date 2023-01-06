import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  hide!:boolean;
  name!:string;
  loginForm = new FormGroup({
    login: new FormControl('',{nonNullable:true,validators:[Validators.required]}),
    password: new FormControl('',{nonNullable:true,validators:[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,20}')]}),
  });
  constructor(private matSnackBar:MatSnackBar ,private router:Router,public loginService:LoginService) { }

  ngOnInit(): void {
    this.hide=true;
    this.name=(localStorage.getItem('name')!==null)?localStorage.getItem('name')!:''
  }

  cancel(){
    this.loginForm.controls.login.setValue('');
    this.loginForm.controls.password.setValue('');
  }

  async onSubmit(){
    await this.loginService.login(this.loginForm.controls.login.value,this.loginForm.controls.password.value).then((resolve)=>{
      if (this.loginService.logged===true) {
        this.name=localStorage.getItem('name')!;
        this.router.navigate(['/']);
      }
    }).catch((reject)=>{
    })
  }

  logout() {
    this.loginService.logout();
  }
}
