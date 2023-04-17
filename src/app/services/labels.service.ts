import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Labels } from '../interfaces/labels';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  constructor(private httpClient: HttpClient) { }


  getLabels(id: number): Promise<Labels[]> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
      params: new HttpParams().append('id', id)
    };
    return new Promise<Labels[]>((resolve, reject) => {
      this.httpClient.get<Labels[]>(`${environment.baseUrl}labels/getAll`, options).subscribe((labels) => {
        resolve(<Labels[]>labels);
      }, (error) => { reject([]) });
    })
  }

  add(id: number, label:Labels): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` })
      };
      const body = { id: id, data: { id:label.id,angle:label.angle,color:label.color,fontSize:label.fontSize,text:label.text,project:label.project,visible:label.visible,x:label.x,y:label.y } as Labels };
      this.httpClient.post(`${environment.baseUrl}label/add`, body, options).subscribe((node) => {
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

  getLabel(id: number): Promise<Labels> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
      params: new HttpParams().append('id', id)
    };
    return new Promise<Labels>((resolve, reject) => {
      this.httpClient.get<Labels>(`${environment.baseUrl}labels/getOne`, options).subscribe((labels) => {
        resolve(<Labels>labels);
      }, (error) => { reject([]) });
    })
  }

}