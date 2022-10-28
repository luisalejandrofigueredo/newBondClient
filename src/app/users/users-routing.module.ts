import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomeUsersComponent } from "./home-users/home-users.component";
import { ChangePasswordComponent } from "../users/change-password/change-password.component";
const routes: Routes = [
  {path:'users',
  component:HomeUsersComponent,
  children: [
      { path: 'login', component: LoginComponent },
      { path: 'changePassword', component: ChangePasswordComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
