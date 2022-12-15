import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NodeService } from "../services/node.service";
import { ProjectServiceService } from "../services/project-service.service";
import { environment } from "../../environments/environment";
import { NetNode } from "../interfaces/net-node";
import { Node } from "../interfaces/node";
@Injectable({
  providedIn: 'root'
})
export class NetNodeService {
  constructor(private httpClient: HttpClient, private nodeService: NodeService, private projectService: ProjectServiceService) { }
  add(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` })
      }
      const body = { data: { id } };
      this.httpClient.post(`${environment.baseUrl}netNode/add`, body, options).subscribe((response) => {
        resolve(true);
      }, (error) => { reject(true) });
    });
  }

  getNode(id: number): Promise<Node> {
    return new Promise<Node>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
        params: new HttpParams().append('id', id)
      }
      this.httpClient.get<Node>(`${environment.baseUrl}netNode/getNode`, options).subscribe((node) => {
        resolve(node)
      }, (_error) => {
        reject({})
      });
    });
  }
}