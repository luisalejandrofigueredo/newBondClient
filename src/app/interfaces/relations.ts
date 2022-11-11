import { Node  } from "./node";
export interface Relations {
    id?:number,
    name:string,
    description:string,
    from:Node,
    to:Node,
}
