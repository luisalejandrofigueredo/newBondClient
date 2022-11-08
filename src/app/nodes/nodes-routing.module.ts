import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard } from '../guards/login-guard.guard';
import { HomeNodeComponent } from "./home-node/home-node.component";
import { NewNodeComponent } from "./new-node/new-node.component";
import { ViewNodesComponent } from "./view-nodes/view-nodes.component";

const routes: Routes = [{
 path: 'nodes', component: HomeNodeComponent,
children: [
  { path: 'viewNodes', component: ViewNodesComponent },
  { path: 'newNode', component: NewNodeComponent },
],
canActivate:[LoginGuardGuard],
runGuardsAndResolvers:'always'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NodesRoutingModule { }
