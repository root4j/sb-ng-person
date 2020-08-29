import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Dpto } from '../../interfaces/dpto';
import { ConfirmDialogModel } from '../../interfaces/confirm-dialog-model';

import { DptoService } from '../../services/dpto.service';
import { SnackBarService } from '../../services/snack-bar.service';

import { DptoDialogComponent } from '../dpto-dialog/dpto-dialog.component';
import { ConfirmDialogComponent } from '../../util/confirm-dialog/confirm-dialog.component'; 

const dialogSize: string = '650px';

@Component({
  selector: 'app-dpto',
  templateUrl: './dpto.component.html',
  styleUrls: ['./dpto.component.css']
})
export class DptoComponent implements OnInit {
  /**
   * Array para definicion de columnas visibles del DataTable
   */
  displayedColumns = ['codigo', 'nombre', 'pais', 'accion'];
  /**
   * Objeto para manejo del DataSource del DataTable
   */
  dataSource: MatTableDataSource<Dpto>;
  /**
   * Objeto para manejo de Paginacion del DataTable
   */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  /**
   * Objeto para manejo de Ordenamiento del DataTable
   */
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
   * Constructor del componente
   * @param mainService Inyeccion del servicio DptoService
   * @param dialog Inyeccion de la clase MatDialog
   * @param _snk Inyeccion del servicio SnackBarService
   */
  constructor(
    private mainService: DptoService,
    public dialog: MatDialog,
    private _snk: SnackBarService) { }

  /**
   * Metodo de inicio despues de la construccion del componente
   */
  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Metodo para aplicar filtros sobre el DataTable
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
   * Metodo que llama el componente de Dialogo para creacion
   */
  openNewDialog(): void {
    const dialogRef = this.dialog.open(DptoDialogComponent, {
      width: dialogSize,
      data: { create: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
  }

  /**
   * Metodo que llama el componente de Dialogo para modificacion
   * @param obj Objeto que se va a modificar
   */
  openEditDialog(obj: Dpto): void {
    const dialogRef = this.dialog.open(DptoDialogComponent, {
      width: dialogSize,
      data: { create: false, data: obj }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
  }

  /**
   * Metodo que llama el componente de Dialogo para eliminar
   * @param obj Objeto que se va a eliminar
   */
  openDeleteDialog(obj: Dpto): void {
    const dialogData = new ConfirmDialogModel('Eliminar Dpto', 'Seguro que desea eliminar el Dpto ' + obj.nombre + '?');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: dialogSize,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(obj.codigo);
      }
    });
  }

  /**
   * Metodo para eliminar Dpto
   */
  delete(id: string): void {
    this.mainService.delete(id)
      .subscribe((res: any) => {
        if (res !== undefined && res !== null && res.hasOwnProperty('ownHandle')) {
          this._snk.show(res.message);
          console.error(res.object);
        } else {
          this._snk.show('Dpto eliminado exitosamente!');
          this.getAll();
        }
      }, err => {
        console.error(err);
      });
  }

  /**
   * Metodo para obtener todos los objetos de la entidad
   */
  getAll(): void {
    this.mainService.getAll()
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        console.error(err);
      });
  }
}