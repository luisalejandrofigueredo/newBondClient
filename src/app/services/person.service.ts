import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient) { }

  add(person: Person) {
    return new Promise<Person>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` })
      }
      const body = { data: person };
      this.httpClient.post(`${environment.baseUrl}person/add`, body, options).subscribe((response) => {
        resolve(response as Person);
      }, (error) => { reject({} as Person) });
    });
  }

  put(person: Person): Promise<boolean> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` })
    };
    return new Promise<boolean>((resolve, reject) => {
      const body = { data: person };
      this.httpClient.put(`${environment.baseUrl}person/update`, body, options).subscribe((node) => {
        resolve(true);
      }, (error) => {
        reject(false);
      });
    })


  }
}
