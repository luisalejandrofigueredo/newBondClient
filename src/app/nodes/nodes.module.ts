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
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { EditNodeComponent } from './edit-node/edit-node.component';
import { WarperComponent } from "../warper/warper.component";
import { ModulesNodeComponent } from './modules-node/modules-node.component';
import { PersonalFileComponent } from './personal-file/personal-file.component';
import {ImagePipe} from '../image.pipe';

@NgModule({
  declarations: [
    NewNodeComponent,
    HomeNodeComponent,
    ViewNodesComponent,
    EditNodeComponent,
    ModulesNodeComponent,
    PersonalFileComponent,
    ImagePipe
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
    MatSelectModule,
    LayoutModule,
    ReactiveFormsModule,
    WarperComponent
  ],
  providers: []
})
export class NodesModule { }
