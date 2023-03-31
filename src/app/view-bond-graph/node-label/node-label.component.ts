import { Component, OnInit } from '@angular/core';
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
  id:number=0;
  constructor(private location:Location,private nodeService: NodeService, private projectService: ProjectServiceService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      this.id=params['id'];
      await this.nodeService.getNode(this.projectService.project, this.id).then((node) => {
        this.labelForm.controls.angleLabel.setValue(node.angleLabel);
        this.labelForm.controls.distanceLabel.setValue(node.distanceLabel);
        this.node=node;
        console.log('node',this.node)
      });
    });
  }
  async onSubmit() {  
    this.node.distanceLabel=this.labelForm.controls.distanceLabel.value;
    this.node.angleLabel=this.labelForm.controls.angleLabel.value;
    await this.nodeService.putNode(this.id,this.node).then((resolve)=>{
      this.location.back();
    });
  }
  cancel(){
    this.location.back()
  }
}
