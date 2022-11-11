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

@NgModule({
  declarations: [
    HomeComponent,
    AddConnectionComponent,
    ViewConnectionsComponent
  ],
  imports: [
    CommonModule,
    ConnectionsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class ConnectionsModule { }
