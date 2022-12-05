import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ViewBondComponent } from "./view-bond/view-bond.component";
import { NewConnectionComponent  } from "./new-connection/new-connection.component";
const routes: Routes = [{
  path:'homeBondGraph',
  component:HomeComponent,
  children:[
    { path:'view',component:ViewBondComponent},
    { path:'newConnection/:id/:idNodeCon',component:NewConnectionComponent}
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewBondGraphRoutingModule { }
