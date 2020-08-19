import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashTestComponent } from './dash-test/dash-test.component';
import { DragTestComponent } from './drag-test/drag-test.component';
import { FormTestComponent } from './form-test/form-test.component';
import { NavTestComponent } from './nav-test/nav-test.component';
import { TreeTestComponent } from './tree-test/tree-test.component';
import { TabTestComponent } from './tab-test/tab-test.component';
import { PaisComponent } from './pais/pais.component';
import { DptoComponent } from './dpto/dpto.component';
import { CiudadComponent } from './ciudad/ciudad.component';

const routes: Routes = [
  { path: 'dash', component: DashTestComponent },
  { path: 'drag', component: DragTestComponent },
  { path: 'form', component: FormTestComponent },
  { path: 'nav', component: NavTestComponent },
  { path: 'tab', component: TabTestComponent },
  { path: 'tree', component: TreeTestComponent },
  { path: 'pais', component: PaisComponent },
  { path: 'dpto', component: DptoComponent },
  { path: 'ciudad', component: CiudadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
