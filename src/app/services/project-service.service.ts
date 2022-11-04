import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  constructor(private httpClient: HttpClient) { }

  addProject(id: number, project: { name: string, description: string }): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization':`Bearer: ${localStorage.getItem("token")}`}),
      };
      const body = { data: { user_id: id, name: project.name, description: project.description } }
      await this.httpClient.post(`${environment.baseUrl}project/add`, body,options).subscribe((subscribe) => { resolve(true) }, (error) => { reject(false) });
    }
    );
  }



}
