import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NodeService } from 'src/app/services/node.service';
import { Location } from "@angular/common";
import { Node } from "../../interfaces/node";
import { ProjectServiceService } from 'src/app/services/project-service.service';

@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.sass']
})
export class EditNodeComponent implements OnInit {
  id!: number;
  nodeCache!: Node;
  nodeForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    colorCtr: new FormControl<string>('', { nonNullable: true }),
    net: new FormControl<boolean>(false, { nonNullable: true }),
    visible: new FormControl<boolean>(false, { nonNullable: true })
  });
  constructor(private projectService:ProjectServiceService,private location: Location, private activatedRoute: ActivatedRoute, private router: Router, private loginService: LoginService, private nodeService: NodeService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.nodeService.getNode(this.projectService.project, this.id).then((node) => {
        this.nodeForm.controls.name.setValue(node.name);
        this.nodeForm.controls.description.setValue(node.description);
        this.nodeForm.controls.colorCtr.setValue('#'+node.color);
        this.nodeForm.controls.net.setValue(node.net);
        this.nodeForm.controls.visible.setValue(node.visible);
        this.nodeCache = node;
      }).catch((error) => console.log('Error getting node '))
    });
  }

  onSubmit() {
    let color = this.nodeForm.controls.colorCtr.value
    if (this.nodeForm.controls.colorCtr.dirty) {
      const colorEval = eval(this.nodeForm.controls.colorCtr.value)
      color = colorEval.hex;
    } else
    {
      color=this.nodeForm.controls.colorCtr.value.substring(1);
    }
    const node = {
      id: this.id,
      name: this.nodeForm.controls.name.value,
      description: this.nodeForm.controls.description.value,
      net: this.nodeForm.controls.net.value,
      visible: this.nodeForm.controls.visible.value,
      x: this.nodeCache.x,
      y: this.nodeCache.y,
      color: color
    } as Node;
    this.nodeService.putNode(this.id, node).then((accept) => {
      this.location.back();
    }).catch((reject) => {
      this.location.back();
    });
  }

  cancel() {
    this.location.back();
  }
}
