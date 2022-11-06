import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from 'src/app/services/project-service.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.sass']
})
export class EditProjectComponent implements OnInit {
  private id: number = 0;
  projectForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
  });
  constructor(private router: Router, private projectService: ProjectServiceService, private route: ActivatedRoute,private location:Location) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.projectService.getProject(this.id).then((project) => {
        this.projectForm.controls.name.setValue(project.name);
        this.projectForm.controls.description.setValue(project.description);
      });
    });
  }

  onSubmit() { 
    this.projectService.putProject(this.id,{name:this.projectForm.controls.name.value,description:this.projectForm.controls.description.value});
    this.location.back();
  }
  cancel() { 
    this.location.back();
  }

}
