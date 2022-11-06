import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PathNotFoundComponent } from "./path-not-found/path-not-found.component";
import { LoginGuardGuard } from "./guards/login-guard.guard";
const routes: Routes = [ 
  {path:'',component:HomeComponent},
  {path: 'project',
  loadChildren: () =>
  import(`./projects/projects.module`).then((m) => m.ProjectsModule),
},
{path: 'users',
  loadChildren: () =>
  import(`./users/users.module`).then((m) => m.UsersModule),
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:false,onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
