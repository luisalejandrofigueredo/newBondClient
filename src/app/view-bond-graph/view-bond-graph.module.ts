import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewBondGraphRoutingModule } from './view-bond-graph-routing.module';
import { HomeComponent } from './home/home.component';
import { ViewBondComponent } from './view-bond/view-bond.component';


@NgModule({
  declarations: [
    HomeComponent,
    ViewBondComponent
  ],
  imports: [
    CommonModule,
    ViewBondGraphRoutingModule
  ]
})
export class ViewBondGraphModule { }
