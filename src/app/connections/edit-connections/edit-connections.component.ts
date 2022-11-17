import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { NodeService } from 'src/app/services/node.service';
import { ConnectionsService } from "../../services/connections.service";
import { Location } from "@angular/common";
import { Node } from "../../interfaces/node";
import { Relations } from "../../interfaces/relations";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-connections',
  templateUrl: './edit-connections.component.html',
  styleUrls: ['./edit-connections.component.sass']
})
export class EditConnectionsComponent implements OnInit {
  connectionForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    node: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    toNode: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });
  options: string[] = [];
  optionsTo: string[] = [];
  filteredOptions!: Observable<string[]>;
  filteredOptionsTo!: Observable<string[]>;
  relationBuffer!: Relations;
  nodeColor!: string;
  toNodeColor!: string;
  constructor(private matSnackBar: MatSnackBar, private loginService: LoginService,
    private nodeService: NodeService,
    private connectionService: ConnectionsService,
    private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      this.connectionService.getConnection(params['id']).then(async (connection) => {
        this.connectionForm.controls.name.setValue(connection.name);
        this.connectionForm.controls.description.setValue(connection.description);
        this.connectionForm.controls.node.setValue(connection.from.name);
        this.connectionForm.controls.toNode.setValue(connection.to.name);
        this.relationBuffer = connection;
        await this.nodeService.getNodeByName(this.loginService.id, connection.from.name).then((node) => {
          this.nodeColor = node.color;
        });
        await this.nodeService.getNodeByName(this.loginService.id, connection.to.name).then((node) => {
          this.toNodeColor = node.color;
        });
      });
      await this.nodeService.getNodes(this.loginService.id).then((nodes) => {
        nodes.forEach(element => {
          this.options.push(element.name);
          if (element.name !== this.relationBuffer.from.name) {
            this.optionsTo.push(element.name);
          }
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
    });
  }

  disabled(): boolean {
    return (this.connectionForm.valid && this.connectionForm.dirty) ? false : true
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterTo(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsTo.filter(option => option.toLowerCase().includes(filterValue));
  }

  async updateMySelectionTo(option: string) {
    await this.nodeService.getNodeByName(this.loginService.id, option).then((node) => {
      this.toNodeColor = node.color;
    });
  }

  async updateMySelection(option: string) {
    if (option===this.connectionForm.controls.toNode.value)
    {
      this.connectionForm.controls.toNode.setValue('');
    }
    let newOptions: string[] = [];
    await this.nodeService.getNodes(this.loginService.id).then((nodes) => {
      nodes.forEach(element => {
        if (element.name !== this.connectionForm.controls.node.value) {
          newOptions.push(element.name);
        }
      });
      this.optionsTo = newOptions;
    });
    await this.nodeService.getNodeByName(this.loginService.id, this.connectionForm.controls.node.value).then((node) => {
      this.nodeColor = node.color;
    });
    setTimeout(() => {
      this.filteredOptionsTo = this.connectionForm.controls.toNode.valueChanges.pipe(
        startWith(''),
        map(value => this._filterTo(value || '')),
      );
    }, 1000);
  }

  cancel() {
    this.location.back();
  }

  async onSubmit() {
    let nodeBuffer!: Node;
    let toNodeBuffer!: Node
    await this.nodeService.getNodeByName(this.loginService.id, this.connectionForm.controls.node.value).then((node) => {
      nodeBuffer = node;
    });
    await this.nodeService.getNodeByName(this.loginService.id, this.connectionForm.controls.toNode.value).then((node) => {
      toNodeBuffer = node;
    });
    this.relationBuffer.from = nodeBuffer;
    this.relationBuffer.to = toNodeBuffer;
    this.relationBuffer.name = this.connectionForm.controls.name.value;
    this.relationBuffer.description = this.connectionForm.controls.description.value;
    this.connectionService.put(this.relationBuffer).then((relationPut) => {
      this.matSnackBar.open('Registry updated ', 'Edit', { duration: 3000 });
      this.location.back();
    }).catch((error) => {
      this.matSnackBar.open('Duplicate change values', 'Edit', { duration: 3000 });

    })
  }
}
