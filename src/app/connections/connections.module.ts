import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionsRoutingModule } from './connections-routing.module';
import { HomeComponent } from './home/home.component';
import { AddConnectionComponent } from './add-connection/add-connection.component';
import { ViewConnectionsComponent } from './view-connections/view-connections.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


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
    MatButtonModule
  ]
})
export class ConnectionsModule { }
