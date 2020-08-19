import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaisComponent } from './pais/pais.component';
import { DptoComponent } from './dpto/dpto.component';
import { CiudadComponent } from './ciudad/ciudad.component';

const routes: Routes = [
  { path: 'pais', component: PaisComponent },
  { path: 'dpto', component: DptoComponent },
  { path: 'ciudad', component: CiudadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
