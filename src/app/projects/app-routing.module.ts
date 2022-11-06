import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProjectsComponent } from "./view-projects/view-projects.component";
import { NewProjectComponent } from "./new-project/new-project.component";
import { HomeProjectsComponent } from "./home-projects/home-projects.component";
import { EditProjectComponent } from "../projects/edit-project/edit-project.component";
import { LoginGuardGuard } from "../guards/login-guard.guard";

const routes: Routes = [
  {
    path: 'project', component: HomeProjectsComponent,
    children: [
      { path: 'viewProjects', component: ViewProjectsComponent },
      { path: 'newProject', component: NewProjectComponent },
      { path: 'editProject/:id', component: EditProjectComponent }
    ],
    canActivate:[LoginGuardGuard],
    runGuardsAndResolvers:'always'
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
