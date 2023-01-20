import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ViewBondComponent } from "./view-bond/view-bond.component";
import { NewConnectionComponent  } from "./new-connection/new-connection.component";
import { AlignLabelComponent } from "./align-label/align-label.component";
import { ImagePipe } from './image.pipe';
const routes: Routes = [{
  path:'homeBondGraph',
  component:HomeComponent,
  children:[
    { path:'view',component:ViewBondComponent},
    { path:'newConnection/:id/:idNodeCon',component:NewConnectionComponent},
    { path:'alignLabel/:id',component:AlignLabelComponent},
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewBondGraphRoutingModule { }
