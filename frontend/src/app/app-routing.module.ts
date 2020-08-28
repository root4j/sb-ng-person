import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaisComponent } from './geographic/pais/pais.component';
import { DptoComponent } from './geographic/dpto/dpto.component';
import { CiudadComponent } from './geographic/ciudad/ciudad.component';

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
