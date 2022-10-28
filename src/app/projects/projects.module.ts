import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProjectComponent } from '../projects/new-project/new-project.component'
import { AppRoutingModule } from "./app-routing.module";
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { HomeProjectsComponent } from './home-projects/home-projects.component';
@NgModule({
  declarations: [
    NewProjectComponent,
    ViewProjectsComponent,
    HomeProjectsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class ProjectsModule { }
