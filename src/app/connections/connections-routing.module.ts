import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard } from '../guards/login-guard.guard';
import { HomeComponent } from "./home/home.component";
import { AddConnectionComponent } from "./add-connection/add-connection.component";
import { ViewConnectionsComponent } from "./view-connections/view-connections.component";
const routes: Routes = [{
  path: 'connections',
  component: HomeComponent,
  children: [
    { path: 'add', component: AddConnectionComponent },
    { path: 'viewConnections', component: ViewConnectionsComponent },
  ],
  canActivate: [LoginGuardGuard],
  runGuardsAndResolvers: 'always'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionsRoutingModule { }
