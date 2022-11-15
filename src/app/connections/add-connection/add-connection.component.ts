import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { NodeService } from 'src/app/services/node.service';
import { ConnectionsService } from "../../services/connections.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-add-connection',
  templateUrl: './add-connection.component.html',
  styleUrls: ['./add-connection.component.sass']
})

export class AddConnectionComponent implements OnInit {
  connectionForm = new FormGroup({
    name:new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true}),
    node: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    toNode: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });
  options: string[] = [];
  optionsTo: string[] = [];
  filteredOptions!: Observable<string[]>;
  filteredOptionsTo!: Observable<string[]>;

  constructor(private location:Location,private connectionService:ConnectionsService,private loginService: LoginService, private nodeService: NodeService) { }

  async ngOnInit(): Promise<void> {
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

  async updateMySelection(option: string) {
    let newOptions:string[]=[];
    await this.nodeService.getNodes(this.loginService.id).then((nodes) => {
      nodes.forEach(element => {
        if (element.name !== this.connectionForm.controls.node.value) {
          newOptions.push(element.name);
        }
      });
      this.optionsTo=newOptions;
    });
    setTimeout(() => {
      this.filteredOptionsTo = this.connectionForm.controls.toNode.valueChanges.pipe(
        startWith(''),
        map(value => this._filterTo(value || '')),
      );
    }, 1000);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterTo(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsTo.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit(){
    this.connectionService.getConnections
  }

  cancel(){
    this.location.back();
  }

}
