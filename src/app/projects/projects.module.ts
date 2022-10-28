import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProjectComponent } from '../projects/new-project/new-project.component'
import { AppRoutingModule } from "./app-routing.module";
import { ViewProjectsComponent } from './view-projects/view-projects.component';
@NgModule({
  declarations: [
    NewProjectComponent,
    ViewProjectsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class ProjectsModule { }
