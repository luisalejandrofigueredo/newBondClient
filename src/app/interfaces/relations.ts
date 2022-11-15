import { Node  } from "./node";
import { Project } from "./project";
export interface Relations {
    id?:number,
    name:string,
    description:string,
    from:Node,
    to:Node,
    project:Project
}
