import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PathNotFoundComponent } from "./path-not-found/path-not-found.component";
const routes: Routes = [ 
  {path:'',component:HomeComponent},
  {path: 'projects',
  loadChildren: () =>
  import(`./projects/projects.module`).then((m) => m.ProjectsModule),
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
