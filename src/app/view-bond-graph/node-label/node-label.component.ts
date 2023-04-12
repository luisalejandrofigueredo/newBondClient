import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from "../../services/node.service";
import { Location } from "@angular/common";
import { ProjectServiceService } from "../../services/project-service.service";
import { Node } from "../../interfaces/node";
@Component({
  selector: 'app-node-label',
  templateUrl: './node-label.component.html',
  styleUrls: ['./node-label.component.sass']
})
export class NodeLabelComponent implements OnInit {
  labelForm = new FormGroup({
    angleLabel: new FormControl<number>(0, { nonNullable: true }),
    distanceLabel: new FormControl<number>(0, { nonNullable: true }),
  });
  node!:Node;
  nodeBuffer!:Node;
  @Input() id: number=0;
  @Output() updateCanvas= new EventEmitter<boolean>();
  @Output() formClosed = new EventEmitter<boolean>();
  constructor(private location:Location,private nodeService: NodeService, private projectService: ProjectServiceService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
      this.nodeService.getNode(this.projectService.project, this.id).then((node) => {
        this.labelForm.controls.angleLabel.setValue(node.angleLabel);
        this.labelForm.controls.distanceLabel.setValue(node.distanceLabel);
        this.node=node;
        this.nodeBuffer={id:node.id,angleLabel:node.angleLabel,color:node.color,description:node.description
        ,distanceLabel:node.distanceLabel,name:node.name,net:node.net,shape:node.shape,visible:node.visible,x:node.x,y:node.y,netNode:node.netNode,person:node.person}as Node;
      });
  }

  update(){
    this.node.angleLabel =this.labelForm.controls.angleLabel.value
    this.node.distanceLabel=this.labelForm.controls.distanceLabel.value
    this.nodeService.putNode(this.id,this.node).then((resolve)=>{
      this.updateCanvas.emit(true);
    });
  }

  async onSubmit() {  
    this.node.distanceLabel=this.labelForm.controls.distanceLabel.value;
    this.node.angleLabel=this.labelForm.controls.angleLabel.value;
    this.nodeService.putNode(this.id,this.node).then((resolve)=>{
      this.formClosed.emit(true);
    });
  }
  cancel(){
    this.nodeService.putNode(this.id,this.nodeBuffer).then((resolve)=>{
      this.formClosed.emit(true);
    });

  }
}
