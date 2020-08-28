import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Pais } from '../interfaces/pais';
import { PaisService } from '../services/pais.service';
import { PaisDialogComponent } from '../pais-dialog/pais-dialog.component';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {
  displayedColumns = ['codigo', 'nombre', 'accion'];
  dataSource: MatTableDataSource<Pais>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private paisService: PaisService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Metodo para aplicar filtros sobre la datatable
   * @param event Valor del filtro
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Se llama el componente de Dialogo
   */
  openNewDialog(): void {
    const dialogRef = this.dialog.open(PaisDialogComponent, {
      width: '650px',
      data: { create: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAll();
    });
  }

  openEditDialog(obj: Pais): void {
    console.log(obj);
    const dialogRef = this.dialog.open(PaisDialogComponent, {
      width: '650px',
      data: { create: false, data: obj}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAll();
    });
  }

  getAll(): void {
    this.paisService.getAll()
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        console.error(err);
      });
  }
}