import { Routes, RouterModule } from '@angular/router';
import { TestgdiComponent} from "./testgdi/testgdi.component";
import { NgModule } from '@angular/core';
const routes: Routes = [
  {
    path: 'testGDI',
    component: TestgdiComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestGdiRoutes { }
