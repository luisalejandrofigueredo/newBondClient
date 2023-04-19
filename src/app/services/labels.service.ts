import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Labels } from '../interfaces/labels';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  constructor(private httpClient: HttpClient) { }
  put(label: Labels): Promise<boolean> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` })
    };
    return new Promise<boolean>((resolve, reject) => {
      const body = { data: label };
      this.httpClient.put<Labels | { message: string }>(`${environment.baseUrl}label/update`, body, options).subscribe((labelResponse) => {
        if ((<{ message: string }>labelResponse)?.message) {
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

  getLabels(id: number): Promise<Labels[]> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
      params: new HttpParams().append('id', id)
    };
    return new Promise<Labels[]>((resolve, reject) => {
      this.httpClient.get<Labels[]>(`${environment.baseUrl}label/getAll`, options).subscribe((labels) => {
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
      this.httpClient.post(`${environment.baseUrl}label/add`, body, options).subscribe((label) => {
        if ((<{ message: string }>label).message === undefined) {
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
      this.httpClient.get<Labels>(`${environment.baseUrl}label/getOne`, options).subscribe((label) => {
        resolve(<Labels>label);
      }, (error) => { reject([]) });
    })
  }

}