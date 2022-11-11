import { Node  } from "./node";
export interface Relations {
    id?:number,
    from:Node,
    to:Node,
    description:string
}
