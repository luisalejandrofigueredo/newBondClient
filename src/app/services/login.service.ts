import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logged: boolean = false;
  id:number=0;
  name:string='';
  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem("token") !== null) {
      this.logged = true;
      this.id=<number><unknown>localStorage.getItem("id")!;
      this.name=<string>localStorage.getItem("name");
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    this.logged=false;
  }

  login(login: string, password: string):Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      };
      const body = { login: login, password: password }
      this.httpClient.post<any>(`${environment.baseUrl}login/login`, body, options).subscribe((response) => {
        if (response.message === undefined){
          localStorage.setItem('token', response.webToken);
          localStorage.setItem('id', response.user.id.toString());
          localStorage.setItem('name', response.user.name);
          this.logged=true;
          resolve(true)
        } else {
          reject(false)
        }
      })
    });
  }
}
