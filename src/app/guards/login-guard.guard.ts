import { Injectable } from '@angular/core';
import { LoginService } from "../services/login.service";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private loginService:LoginService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      console.log('Login service');
      if (this.loginService.logged===true) {
        return true;
      }
      return false;
  }
}
