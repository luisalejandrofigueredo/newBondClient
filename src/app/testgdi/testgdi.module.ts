import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestgdiComponent } from './testgdi/testgdi.component';
import { TestGdiRoutes } from "./testGdi.routing";



@NgModule({
  declarations: [
    TestgdiComponent,
  ],
  imports: [
    CommonModule,
    TestGdiRoutes
  ]
})
export class TestgdiModule { }
