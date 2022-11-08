import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Node } from "../interfaces/node";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private httpClient: HttpClient) { }

  add(node: Node): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` })
      };
      const body = {data:{ name: node.name, description: node.description, net: node.net, visible: node.visible, x: node.x, y: node.y } as Node};
      this.httpClient.post(`${environment.baseUrl}node/add`, body,options).subscribe((node) => {
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

  getNodes(id: number): Promise<Node[]> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
      params: new HttpParams().append('id', id)
    };
    return new Promise<Node[]>((resolve, reject) => {
      this.httpClient.get<Node[]>(`${environment.baseUrl}node/getAll`, options).subscribe((projects) => {
        resolve(<Node[]>projects);
      }, (error) => { reject([]) });
    })
  }
}
