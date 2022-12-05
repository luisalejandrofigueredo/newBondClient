import { Node } from "./node";
import { } from "module";
import { EventCon } from "../interfaces/event-con";
import { Project } from "./project";
export interface Relations {
    id?: number,
    name: string,
    description: string,
    mirrorLabel: boolean,
    from: Node,
    to: Node,
    project: Project,
    eventCones?: EventCon[]
}
