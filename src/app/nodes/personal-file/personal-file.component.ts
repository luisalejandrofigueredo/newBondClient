import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from 'src/app/services/node.service';
import { ProjectServiceService } from 'src/app/services/project-service.service';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/interfaces/person';
import { Node } from 'src/app/interfaces/node';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personal-file',
  templateUrl: './personal-file.component.html',
  styleUrls: ['./personal-file.component.sass']
})

export class PersonalFileComponent implements OnInit {
  nodeId: number = 0;
  gender: string[] = ['Male', 'Female'];
  nodePerson: null | Person = null;
  node!: Node;
  personalForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    surname: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    document: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    gender: new FormControl<string>('Female', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });
  constructor(private snackBar: MatSnackBar, private personService: PersonService, private projectService: ProjectServiceService,
    private nodeService: NodeService,
    private location: Location,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.nodeId = params['id'];
      this.nodeService.getNodeWithPerson(this.projectService.project, this.nodeId).then((node) => {
        this.node = { color: node.color, description: node.description, name: node.name, net: node.net, visible: node.visible, x: node.x, y: node.y,person:node.person };
        this.nodePerson = node.person!;
        if (node.person !== null) {
          this.personalForm.controls.name.setValue(node.person?.name!);
          this.personalForm.controls.surname.setValue(node.person?.surname!);
          this.personalForm.controls.gender.setValue(node.person?.gender!);
          this.personalForm.controls.document.setValue(node.person?.document!);
          this.personalForm.controls.description.setValue(node.person?.description!);
        }
      })

    });
  }

  async onSubmit() {
      let person = this.nodePerson!;
      person.name = this.personalForm.controls.name.value;
      person.surname = this.personalForm.controls.surname.value;
      person.description = this.personalForm.controls.description.value;
      person.document = this.personalForm.controls.document.value;
      person.gender = this.personalForm.controls.gender.value;
      await this.personService.put(person).then((accept) => {
        this.snackBar.open('Updated Person', '', { duration: 5000 })
      })
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
