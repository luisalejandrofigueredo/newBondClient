import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBondGraphRoutingModule } from './view-bond-graph-routing.module';
import { HomeComponent } from './home/home.component';
import { ViewBondComponent } from './view-bond/view-bond.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    HomeComponent,
    ViewBondComponent
  ],
  imports: [
    CommonModule,
    ViewBondGraphRoutingModule,
    MatMenuModule,
    MatButtonModule,
    FlexLayoutModule,
    LayoutModule
    
  ]
})
export class ViewBondGraphModule { }
