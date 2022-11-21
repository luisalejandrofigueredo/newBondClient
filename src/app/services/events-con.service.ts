import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventCon } from "../interfaces/event-con";
import { Relations } from "../interfaces/relations";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EventsConService {
  constructor(private httpClient: HttpClient) { }

  delete(id:number):Promise<boolean>{
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
      params: new HttpParams().append('id', id)
    };
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.delete(`${environment.baseUrl}eventsCon/delete`,options).subscribe((deleted)=>{
        resolve(true);
      },(error)=>{
        reject(false);
      });
    })
  }


  put(eventCon:EventCon):Promise<boolean>{
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` })
    };
    return new Promise<boolean>((resolve, reject) => {
      const body={data:eventCon};
      this.httpClient.put(`${environment.baseUrl}eventsCon/put`,body,options).subscribe((_eventCon)=>{
        resolve(true);
      },(error)=>{
        reject(false);
      });
    })
  }

  add(id: number, eventCon: EventCon): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` })
      };
      const body = { id: id, data: { name: eventCon.name, description: eventCon.description, date: eventCon.date } as EventCon };
      this.httpClient.post(`${environment.baseUrl}eventsCon/add`, body, options).subscribe((eventCon: any) => {
        if ((<{ message: string }>eventCon).message === undefined) {
          resolve(true);
        } else {
          reject(false)
        }
      }, (_error: any) => {
        reject(false);
      });
    });
  }

  getOne(id: number): Promise<EventCon> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
      params: new HttpParams().append('id', id)
    };
    return new Promise<EventCon>((resolve, reject) => {
      this.httpClient.get<EventCon>(`${environment.baseUrl}eventsCon/getOne`, options).subscribe((eventConnections) => {
        resolve(<EventCon>eventConnections);
      }, (error) => { reject([]) });
    })
  }

  getAll(id: number): Promise<EventCon[]> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
      params: new HttpParams().append('id', id)
    };
    return new Promise<EventCon[]>((resolve, reject) => {
      this.httpClient.get<Relations>(`${environment.baseUrl}eventsCon/getAll`, options).subscribe((relations) => {
        resolve(<EventCon[]>relations.eventCones);
      }, (error) => { reject([]) });
    })
  }
}
