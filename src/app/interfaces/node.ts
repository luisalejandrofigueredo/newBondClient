import { NetNode } from "../interfaces/net-node";
export interface Node {
    id?:number,
    name:string,
    description:string,
    x:number,
    y:number,
    visible:boolean,
    color:string,
    net:boolean,
    netNode?:NetNode
}
