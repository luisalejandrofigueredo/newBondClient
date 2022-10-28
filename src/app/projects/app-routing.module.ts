import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProjectsComponent } from "./view-projects/view-projects.component";
import { NewProjectComponent } from "./new-project/new-project.component";
const routes: Routes = [
  {path:'project',component:ViewProjectsComponent,
  children: [{ path: 'newProject', component: NewProjectComponent }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
