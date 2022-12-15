import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBondGraphRoutingModule } from './view-bond-graph-routing.module';
import { HomeComponent } from './home/home.component';
import { ViewBondComponent } from './view-bond/view-bond.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewConnectionComponent } from './new-connection/new-connection.component';
import { WarperComponent } from "../warper/warper.component";
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AlignLabelComponent } from './align-label/align-label.component';


@NgModule({
  declarations: [
    HomeComponent,
    ViewBondComponent,
    NewConnectionComponent,
    AlignLabelComponent
  ],
  imports: [
    CommonModule,
    ViewBondGraphRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    LayoutModule,
    WarperComponent,
    ReactiveFormsModule
  ]
})
export class ViewBondGraphModule { }
