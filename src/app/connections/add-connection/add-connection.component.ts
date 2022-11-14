import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { NodeService } from 'src/app/services/node.service';

@Component({
  selector: 'app-add-connection',
  templateUrl: './add-connection.component.html',
  styleUrls: ['./add-connection.component.sass']
})

export class AddConnectionComponent implements OnInit {
  connectionForm = new FormGroup({
    node: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(private loginService: LoginService, private nodeService: NodeService) { }

  async ngOnInit(): Promise<void> {
    await this.nodeService.getNodes(this.loginService.id).then((nodes) => {
      nodes.forEach(element => {
        this.options.push(element.name);
      });
    });
    this.filteredOptions = this.connectionForm.controls.node.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
