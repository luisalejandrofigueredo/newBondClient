import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionsRoutingModule } from './connections-routing.module';
import { HomeComponent } from './home/home.component';
import { AddConnectionComponent } from './add-connection/add-connection.component';
import { ViewConnectionsComponent } from './view-connections/view-connections.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { EditConnectionsComponent } from './edit-connections/edit-connections.component';
import { WarperComponent } from "../warper/warper.component";
import { ViewEventConComponent } from './view-event-con/view-event-con.component';
@NgModule({
  declarations: [
    HomeComponent,
    AddConnectionComponent,
    ViewConnectionsComponent,
    EditConnectionsComponent,
    ViewEventConComponent
  ],
  imports: [
    CommonModule,
    ConnectionsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    FlexLayoutModule,
    LayoutModule,
    WarperComponent
  ]
})
export class ConnectionsModule { }
