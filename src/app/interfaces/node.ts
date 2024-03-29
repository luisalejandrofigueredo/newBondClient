import { NetNode } from "./net-node";
import { Person } from "./person";
export interface Node {
    id?:number,
    name:string,
    description:string,
    x:number,
    y:number,
    visible:boolean,
    color:string,
    net:boolean,
    shape:number,
    angleLabel:number,
    distanceLabel:number,
    netNode?:NetNode[],
    person?:null|Person,
}
