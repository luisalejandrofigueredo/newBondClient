import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Relations } from "../interfaces/relations";
@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {

  constructor(private httpClient: HttpClient) { }

  deleteRelation(id:number):Promise<boolean>{
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
      params: new HttpParams().append('id', id)
    };
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.delete(`${environment.baseUrl}relations/delete`,options).subscribe((deleted)=>{
        resolve(true);
      },(error)=>{
        reject(false);
      });
    })
  }

  put(relation: Relations): Promise<boolean> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` })
    };
    return new Promise<boolean>((resolve, reject) => {
      const body = { data: relation };
      this.httpClient.put<Relations | { message: string }>(`${environment.baseUrl}relations/update`, body, options).subscribe((relationResponse) => {
        if ((<{ message: string }>relationResponse)?.message) {
          reject(false);
        }
        else {
          resolve(true);
        }
      }, (error) => {
        reject(false);
      });
    })
  }

  getConnection(id: number): Promise<Relations> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
      params: new HttpParams().append('id', id)
    };
    return new Promise<Relations>((resolve, reject) => {
      this.httpClient.get<Relations>(`${environment.baseUrl}relations/getOne`, options).subscribe((relations) => {
        resolve(<Relations>relations);
      }, (error) => { reject([]) });
    })
  }

  getConnections(id: number): Promise<Relations[]> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
      params: new HttpParams().append('id', id)
    };
    return new Promise<Relations[]>((resolve, reject) => {
      this.httpClient.get<Relations[]>(`${environment.baseUrl}relations/getAll`, options).subscribe((relations) => {
        resolve(<Relations[]>relations);
      }, (error) => { reject([]) });
    })
  }

  add(id: number, relation: Relations): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` })
      };
      const body = { id: id, data: { name: relation.name, description: relation.description, to: relation.to, from: relation.from, project: relation.project } as Relations };
      this.httpClient.post(`${environment.baseUrl}relations/add`, body, options).subscribe((node) => {
        if ((<{ message: string }>node).message === undefined) {
          resolve(true);
        } else {
          reject(false)
        }
      }, (error) => {
        reject(false);
      });
    });
  }
}
