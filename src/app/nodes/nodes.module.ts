import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodesRoutingModule } from './nodes-routing.module';
import { NewNodeComponent } from './new-node/new-node.component';
import { HomeNodeComponent } from './home-node/home-node.component';
import { ViewNodesComponent } from './view-nodes/view-nodes.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    NewNodeComponent,
    HomeNodeComponent,
    ViewNodesComponent
  ],
  imports: [
    CommonModule,
    NodesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule
  ]
})
export class NodesModule { }
