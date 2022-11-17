import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesRoutingModule } from './nodes-routing.module';
import { NewNodeComponent } from './new-node/new-node.component';
import { HomeNodeComponent } from './home-node/home-node.component';
import { ViewNodesComponent } from './view-nodes/view-nodes.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditNodeComponent } from './edit-node/edit-node.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { WarperComponent } from "../warper/warper.component";


@NgModule({
  declarations: [
    NewNodeComponent,
    HomeNodeComponent,
    ViewNodesComponent,
    EditNodeComponent,

  ],
  imports: [
    CommonModule,
    NodesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    NgxMatColorPickerModule,
    LayoutModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    WarperComponent
  ],
  providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }]
})
export class NodesModule { }
