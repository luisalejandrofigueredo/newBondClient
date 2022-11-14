import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Relations } from "../interfaces/relations";
@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {

  constructor(private httpClient:HttpClient) { }

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
}
