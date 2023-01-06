import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from "./app-routing.module";
import { NewProjectComponent } from '../projects/new-project/new-project.component'
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { HomeProjectsComponent } from './home-projects/home-projects.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { EditProjectComponent } from './edit-project/edit-project.component';

@NgModule({
  declarations: [
    NewProjectComponent,
    ViewProjectsComponent,
    HomeProjectsComponent,
    EditProjectComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    LayoutModule
  ]
})
export class ProjectsModule { }
