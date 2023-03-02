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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  fileName!: string;
  src = "assets/noimage.jpg"
  personalForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    surname: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    document: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    gender: new FormControl<string>('Female', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    mobile: new FormControl<string>('', { nonNullable: true, validators: [Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.email] }),
    web: new FormControl<string>('', { nonNullable: true, validators: [Validators.pattern('^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$')] }),
    file: new FormControl<string>('', { nonNullable: true })
  });
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar, private personService: PersonService, private projectService: ProjectServiceService,
    private nodeService: NodeService,
    private location: Location,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.nodeId = params['id'];
      this.nodeService.getNodeWithPerson(this.projectService.project, this.nodeId).then((node) => {
        this.node = { shape:node.shape,color: node.color, description: node.description, name: node.name, net: node.net, visible: node.visible, x: node.x, y: node.y, person: node.person,angleLabel:node.angleLabel,distanceLabel:node.distanceLabel };
        this.nodePerson = node.person! as Person;
        if (node.person !== null) {
          this.personalForm.controls.name.setValue(node.person?.name!);
          this.personalForm.controls.surname.setValue(node.person?.surname!);
          this.personalForm.controls.gender.setValue(node.person?.gender!);
          this.personalForm.controls.document.setValue(node.person?.document!);
          this.personalForm.controls.description.setValue(node.person?.description!);
          this.personalForm.controls.mobile.setValue(node.person?.mobile!);
          this.personalForm.controls.web.setValue(node.person?.web!);
          this.personalForm.controls.email.setValue(node.person?.email!);
          if (node.person?.image!!=='')
          {
            this.src=node.person?.image!
          }
          else
          {
            this.src="assets/noimage.jpg"
          }
        }
      })

    });
  }

  fileUpload(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("profilePic", file);
       this.httpClient.post<{pathFile:string}>(`${environment.baseUrl}person/upload`, formData).subscribe((end)=>{
        console.log('file uploaded');
        this.src=`${environment.baseUrl}person/image/?image=`+end.pathFile;
       })
    }
  }



  async onSubmit() {
    let person = this.nodePerson!;
    person.name = this.personalForm.controls.name.value;
    person.surname = this.personalForm.controls.surname.value;
    person.gender = this.personalForm.controls.gender.value;
    person.document = this.personalForm.controls.document.value;
    person.description = this.personalForm.controls.description.value;
    person.web = this.personalForm.controls.web.value;
    person.email = this.personalForm.controls.email.value;
    person.mobile = this.personalForm.controls.mobile.value;
    person.image=this.src;
    await this.personService.put(person).then((accept) => {
      this.snackBar.open('Updated Person', '', { duration: 5000 })
    })
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
