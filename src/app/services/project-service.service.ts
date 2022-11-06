import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Project } from "../interfaces/project";
@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
  };
  project: number = 0;
  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem("project") !== null) {

    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  deleteProject(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
        params: new HttpParams().append('id', id)
      };
      this.httpClient.delete(`${environment.baseUrl}project/delete`, options).subscribe((deleted) => {
        resolve(true);
      }, (error) => {
        reject(false);
      });
    });
  }

  /**
   * 
   * @param id 
   * @param project 
   * @returns 
   */
  putProject(id: number, project: { name: string, description: string }): Promise<boolean> {
    const body = { data: { id: id, name: project.name, description: project.description } }
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.put(`${environment.baseUrl}project/put`, body, this.options).subscribe((projectPut) => {
        if ((<{ message: string }>projectPut).message === undefined) {
          resolve(true);
        } else {
          reject(false);
        }
      }, (error) => {
        reject(false);
      });
    });
  }


  /**
   * 
   * @param id 
   * @param project 
   * @returns 
   */
  addProject(id: number, project: { name: string, description: string }): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const body = { data: { user_id: id, name: project.name, description: project.description } }
      this.httpClient.post(`${environment.baseUrl}project/add`, body, this.options).subscribe((subscribe) => {
        if ((<{ message: string }>subscribe).message === undefined) {
          resolve(true);
        } else {
          reject(false)
        }
      }, (error) => { reject(false) });
    }
    );
  }
  /**
   * 
   * @param id id user
   * @returns 
   */
  getProjects(id: number): Promise<Project[]> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
      params: new HttpParams().append('id', id)
    };
    return new Promise<Project[]>((resolve, reject) => {
      this.httpClient.get<Project[]>(`${environment.baseUrl}project/getAll`, options).subscribe((projects) => {
        resolve(<Project[]>projects);
      }, (error) => { reject([]) });
    })
  }
  /**
   * @param id 
   * @returns 
   */
  getProject(id: number): Promise<Project> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
      params: new HttpParams().append('id', id)
    };
    return new Promise<Project>((resolve, reject) => {
      this.httpClient.get<Project>(`${environment.baseUrl}project/getOne`, options).subscribe((project) => {
        resolve(<Project>project);
      }, (error) => { reject({}) });
    })
  }
}
