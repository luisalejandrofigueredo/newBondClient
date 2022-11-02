import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logged: boolean = false;
  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem("token") !== null) {
      this.logged = true;
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.logged=false;
  }

  login(login: string, password: string):Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      const body = { login: login, password: password }
      this.httpClient.post<any>(`${environment.baseUrl}login/login`, body, options).subscribe((response) => {
        if (response.message === undefined){
          localStorage.setItem('token', response.webToken);
          this.logged=true;
          resolve(true)
        } else {
          resolve(false)
        }
      })
    });
  }
}
