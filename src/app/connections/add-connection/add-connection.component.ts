import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { NodeService } from 'src/app/services/node.service';
import { ConnectionsService } from "../../services/connections.service";
import { Location } from "@angular/common";
import { Node } from "../../interfaces/node";
import { Project } from 'src/app/interfaces/project';
import { ProjectServiceService } from 'src/app/services/project-service.service';
@Component({
  selector: 'app-add-connection',
  templateUrl: './add-connection.component.html',
  styleUrls: ['./add-connection.component.sass']
})

export class AddConnectionComponent implements OnInit {
  connectionForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    node: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    toNode: new FormControl<string>('', {nonNullable: true, validators: [Validators.required] })
  });
  options: string[] = [];
  optionsTo: string[] = [];
  nodeColor='FFFFFF';
  toNodeColor='FFFFFF';
  filteredOptions!: Observable<string[]>;
  filteredOptionsTo!: Observable<string[]>;

  constructor(private projectService: ProjectServiceService, private location: Location, private connectionService: ConnectionsService, private loginService: LoginService, private nodeService: NodeService) { }

  async ngOnInit(): Promise<void> {
    this.connectionForm.controls.toNode.disable;
    await this.nodeService.getNodes(this.loginService.id).then((nodes) => {
      nodes.forEach(element => {
        this.options.push(element.name);
        this.optionsTo.push(element.name);
      });
    });
    this.filteredOptions = this.connectionForm.controls.node.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.filteredOptionsTo = this.connectionForm.controls.toNode.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTo(value || '')),
    );
  }

  change(){
    this.connectionForm.controls.toNode.enable
  }

  async updateMySelection(option: string) {
    let newOptions: string[] = [];
    await this.nodeService.getNodes(this.loginService.id).then((nodes) => {
      nodes.forEach(element => {
        if (element.name !== this.connectionForm.controls.node.value) {
          newOptions.push(element.name);
        } else {
          this.nodeColor=element.color;
        }
      });
      this.optionsTo = newOptions;
    });
    setTimeout(() => {
      this.filteredOptionsTo = this.connectionForm.controls.toNode.valueChanges.pipe(
        startWith(''),
        map(value => this._filterTo(value || '')),
      );
    }, 1000);
  }

  async updateMySelectionToNode(option:string){
    await this.nodeService.getNodeByName(this.loginService.id,option).then((node)=>{
      this.toNodeColor=node.color;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterTo(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsTo.filter(option => option.toLowerCase().includes(filterValue));
  }

  async onSubmit() {
    let nodeBuffer!: Node;
    let toNodeBuffer!: Node;
    let projectBuffer!: Project;
    await this.projectService.getProject(this.loginService.id).then((project) => {
      projectBuffer = project;
    })
    await this.nodeService.getNodeByName(this.loginService.id, this.connectionForm.controls.node.value).then((node) =>
      nodeBuffer = node);
    await this.nodeService.getNodeByName(this.loginService.id, this.connectionForm.controls.toNode.value).then((toNode) => toNodeBuffer = toNode);
    this.connectionService.add(this.loginService.id, {
      name: this.connectionForm.controls.name.value,
      description: this.connectionForm.controls.description.value,
      from: nodeBuffer,
      to: toNodeBuffer,
      project: projectBuffer
    }).then((resolve) => {
      this.location.back();
    }).catch((reject) => { });
  }

  cancel() {
    this.location.back();
  }

}
