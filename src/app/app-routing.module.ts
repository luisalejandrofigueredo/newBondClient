import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'project',
    loadChildren: () =>
      import(`./projects/projects.module`).then((m) => m.ProjectsModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import(`./users/users.module`).then((m) => m.UsersModule),
  },
  {
    path: 'nodes',
    loadChildren: () =>
      import(`./nodes/nodes.module`).then((m) => m.NodesModule),
  },
  {
    path: 'connections',
    loadChildren: () =>
      import(`./connections/connections.module`).then((m) => m.ConnectionsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
