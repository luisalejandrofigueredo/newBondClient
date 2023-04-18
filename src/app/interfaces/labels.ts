import { Project } from "./project";
export interface Labels {
    id:number;
    text:string;
    color:string;
    angle:number;
    fontSize:number;
    x:number;
    y:number;
    visible:boolean;
    project?:Project;
}
