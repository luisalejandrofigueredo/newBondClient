import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from 'src/app/services/node.service';
import { ProjectServiceService } from "../../services/project-service.service";
import { Node } from "../../interfaces/node";
import { Location } from "@angular/common";
import { ConnectionsService } from 'src/app/services/connections.service';
import { Relations } from 'src/app/interfaces/relations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from 'src/app/interfaces/project';

@Component({
  selector: 'app-new-connection',
  templateUrl: './new-connection.component.html',
  styleUrls: ['./new-connection.component.sass']
})
export class NewConnectionComponent implements OnInit {
  connectionForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
  });
  node: Node = { x: 0, y: 0, color: 'ffffff', description: '', name: '', net: false, visible: true };
  toNode: Node = { x: 0, y: 0, color: 'ffffff', description: '', name: '', net: false, visible: true };
  constructor(private matSnackBar: MatSnackBar, private connectionService: ConnectionsService, private location: Location, private projectService: ProjectServiceService, private nodeService: NodeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      await this.nodeService.getNode(this.projectService.project, params['id']).then((node) => {
        this.node = node;
      });
      await this.nodeService.getNode(this.projectService.project, params['idNodeCon']).then((node) => {
        this.toNode = node;
      });
    });
  }

  cancel() {
    this.location.back();
  }

  async onSubmit() {
    let projectBuffer!: Project;
    await this.projectService.getProject(this.projectService.project).then((project) => {
      projectBuffer = project;
    })
    const relation: Relations = {
      name: this.connectionForm.controls.name.value,
      description: this.connectionForm.controls.description.value,
      from: this.node, to: this.toNode,
      project:projectBuffer,
      mirrorLabel: false
    };
    await this.connectionService.add(this.projectService.project, relation).then((newRelation) => {
      this.location.back();
    }).catch((error) => {
      this.matSnackBar.open('Possible duplicate name or node relation', 'create', { duration: 3000 });
    });
  }

}
