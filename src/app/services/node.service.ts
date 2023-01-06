import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Node } from "../interfaces/node";
import { NetNode } from "../interfaces/net-node";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private httpClient: HttpClient) { }

  getChildren_s(id:number,nid:number):Promise<NetNode[]> {
    return new Promise<NetNode[]>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
        params: new HttpParams().append('id', id)
          .append('nid', nid)
      };
      this.httpClient.get<NetNode[]>(`${environment.baseUrl}node/getChildren_s`,options).subscribe((netNodes)=>{
       console.log('net nodes',netNodes);
       resolve(netNodes);
      },(error)=>{
        reject([]);
      });    
    });
  }
  
  add(id: number, node: Node): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` })
      };
      const body = { id: id, data: { name: node.name, description: node.description, net: node.net, visible: node.visible, x: node.x, y: node.y,color: node.color } as Node };
      this.httpClient.post(`${environment.baseUrl}node/add`, body, options).subscribe((node) => {
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


  /**
   * 
   * @param id /project id
   * @returns 
   */
  getNodes(id: number): Promise<Node[]> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
      params: new HttpParams().append('id', id)
    };
    return new Promise<Node[]>((resolve, reject) => {
      this.httpClient.get<Node[]>(`${environment.baseUrl}node/getAll`, options).subscribe((nodes) => {
        resolve(<Node[]>nodes);
      }, (error) => { reject([]) });
    })
  }

  /**
   * 
   * @param id 
   * @param nid 
   */
  getNode(id: number, nid: number): Promise<Node> {
    return new Promise<Node>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
        params: new HttpParams().append('id', id)
          .append('nid', nid)
      };
      this.httpClient.get<Node | { message: string }>(`${environment.baseUrl}node/getOne`, options).subscribe((node) => {
          resolve(<Node>node);
        }
      ,(error)=>{ reject()})
    })
  }

  getNodeByName(id: number, name: string): Promise<Node> {
    return new Promise<Node>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
        params: new HttpParams().append('id', id)
          .append('name', name)
      };
      this.httpClient.get<Node | { message: string }>(`${environment.baseUrl}node/getOneByName`, options).subscribe((node) => {
          resolve(<Node>node);
        }
      ,(error)=>{ reject()})
    })
  }

  putNode(id:number,node:Node):Promise<boolean>{
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` })
    };
    return new Promise<boolean>((resolve, reject) => {
      const body={idProject:id ,data:node};
      this.httpClient.put(`${environment.baseUrl}node/update`,body,options).subscribe((node)=>{
        resolve(true);
      },(error)=>{
        reject(false);
      });
    })
  }

  deleteNode(id:number):Promise<boolean>{
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer: ${localStorage.getItem("token")}` }),
      params: new HttpParams().append('id', id)
    };
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.delete(`${environment.baseUrl}node/delete`,options).subscribe((deleted)=>{
        resolve(true);
      },(error)=>{
        reject(false);
      });
    })
  }
}
