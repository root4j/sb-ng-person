import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { FormTestComponent } from './form-test/form-test.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { NavTestComponent } from './nav-test/nav-test.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TabTestComponent } from './tab-test/tab-test.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DashTestComponent } from './dash-test/dash-test.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { TreeTestComponent } from './tree-test/tree-test.component';
import { MatTreeModule } from '@angular/material/tree';
import { DragTestComponent } from './drag-test/drag-test.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PaisComponent } from './pais/pais.component';
import { DptoComponent } from './dpto/dpto.component';
import { CiudadComponent } from './ciudad/ciudad.component';

@NgModule({
  declarations: [
    AppComponent,
    FormTestComponent,
    NavTestComponent,
    TabTestComponent,
    DashTestComponent,
    TreeTestComponent,
    DragTestComponent,
    PaisComponent,
    DptoComponent,
    CiudadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatMenuModule,
    MatTreeModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
