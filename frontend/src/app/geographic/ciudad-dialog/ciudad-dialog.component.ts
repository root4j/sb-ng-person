import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Ciudad } from '../../interfaces/ciudad'
import { Dpto } from '../../interfaces/dpto'
import { Pais } from '../../interfaces/pais'

import { PaisService } from '../../services/pais.service'
import { DptoService } from '../../services/dpto.service'
import { CiudadService } from '../../services/ciudad.service'
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-ciudad-dialog',
  templateUrl: './ciudad-dialog.component.html',
  styleUrls: ['./ciudad-dialog.component.css']
})
export class CiudadDialogComponent {
  /**
   * Listado de paises para selector
   */
  paises: Pais[];
  /**
   * Listado de paises para selector
   */
  dptos: Dpto[];
  mapDptos: any[];
  /**
   * Instancia del formario
   */
  mainForm: FormGroup = this.fb.group({
    codigo: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    nombre: [null, Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(200)])
    ],
    pais: [null, Validators.required],
    dpto: [null, Validators.required]
  });
  /**
   * Variable que permite determinar si el formario es para editar o crear
   */
  create: boolean = false;

  /**
   * Constructor del componente
   * @param fb Inyeccion de la clase FormBuilder
   * @param _snk Inyeccion del servicio SnackBarService
   * @param mainService Inyeccion del servicio CiudadService
   * @param paisService Inyeccion del servicio PaisService
   * @param dptoService Inyeccion del servicio DptoService
   * @param dialogRef Inyeccion de la clase MatDialogRef
   * @param data Data que se recibe como parametro
   */
  constructor(
    private fb: FormBuilder,
    private _snk: SnackBarService,
    private mainService: CiudadService,
    private paisService: PaisService,
    private dptoService: DptoService,
    public dialogRef: MatDialogRef<CiudadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data !== null) {
      this.getPaises();
      if (this.data.hasOwnProperty('create')) {
        this.create = this.data.create;
      }
      if (this.data.hasOwnProperty('data')) {
        this.getDptosByPais(this.data.data.dpto.pais.codigo);
        this.mainForm.patchValue({
          codigo: this.data.data.codigo,
          nombre: this.data.data.nombre,
          pais: this.data.data.dpto.pais.codigo,
          dpto: this.data.data.dpto.codigo
        });
      }
    }
  }

  /**
   * Metodo para obtener listado de paises
   */
  getPaises(): void {
    this.paisService.getAll()
      .subscribe((res: any) => {
        this.paises = res;
      }, err => {
        console.error(err);
      });
  }

  /**
   * Metodo que buscar Departamentos cuando se cambia el pais
   * @param event Evento donde viene el nuevo valor
   */
  changePais(event: any): void {
    if (event.isUserInput) {
      this.getDptosByPais(event.source.value);
    }
  }

  /**
   * Metodo para obtener listado de dptos
   */
  getDptosByPais(id: string): void {
    this.dptoService.getByPais(id)
      .subscribe((res: any) => {
        this.dptos = res;
        this.mapDptos = res.reduce(function (map: any, obj: any) {
          map[obj.codigo] = obj;
          return map;
        }, {});
      }, err => {
        console.error(err);
      });
  }

  /**
   * Metodo encargado de persistir la informacion
   */
  onSubmit(): void {
    const obj: Ciudad = {
      codigo: this.mainForm.value.codigo,
      nombre: this.mainForm.value.nombre,
      dpto: this.mapDptos[this.mainForm.value.dpto]
    };
    if (this.create) {
      this.post(obj);
    } else {
      this.put(obj.codigo, obj);
    }
  }

  /**
   * Metood encargado de cerrar la ventana dialog
   */
  close(): void {
    this.dialogRef.close();
  }

  /**
   * Metodo encargado de persistir nueva informacion
   * @param obj Objeto a persistir
   */
  post(obj: Ciudad): void {
    this.mainService.add(obj)
      .subscribe((res: any) => {
        if (res !== undefined && res !== null && res.hasOwnProperty('ownHandle')) {
          this._snk.show(res.message);
          console.error(res.object);
        } else {
          this.mainForm.reset();
          this._snk.show('Ciudad creada exitosamente!');
          this.dialogRef.close();
        }
      }, err => {
        this._snk.show('Se presento un error grave, favor verificar la consola');
        console.error(err);
      });
  }

  /**
   * Metodo encargado de actualizar informacion
   * @param id Llave del registro
   * @param obj Objeto a actualizar
   */
  put(id: string, obj: Ciudad): void {
    this.mainService.update(id, obj)
      .subscribe((res: any) => {
        if (res !== undefined && res !== null && res.hasOwnProperty('ownHandle')) {
          this._snk.show(res.message);
          console.error(res.object);
        } else {
          this.mainForm.reset();
          this._snk.show('Ciudad actualizada exitosamente!');
          this.dialogRef.close();
        }
      }, err => {
        this._snk.show('Se presento un error grave, favor verificar la consola');
        console.error(err);
      });
  }
}
