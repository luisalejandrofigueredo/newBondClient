import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestgdiComponent } from './testgdi/testgdi.component';
import { TestGdiRoutes } from "./testGdi.routing";
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TestgdiComponent,
  ],
  imports: [
    CommonModule,
    TestGdiRoutes,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ]
})
export class TestgdiModule { }
