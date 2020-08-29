import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Dpto } from '../../interfaces/dpto'
import { Pais } from '../../interfaces/pais'

import { PaisService } from '../../services/pais.service'
import { DptoService } from '../../services/dpto.service'
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-dpto-dialog',
  templateUrl: './dpto-dialog.component.html',
  styleUrls: ['./dpto-dialog.component.css']
})
export class DptoDialogComponent {
  /**
   * Listado de paises para selector
   */
  paises: Pais[];
  mapPaises: any[];
  /**
   * Instancia del formario
   */
  mainForm: FormGroup = this.fb.group({
    codigo: [null, Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(2)])
    ],
    nombre: [null, Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(200)])
    ],
    pais: [null, Validators.required]
  });
  /**
   * Variable que permite determinar si el formario es para editar o crear
   */
  create: boolean = false;

  /**
   * Constructor del componente
   * @param fb Inyeccion de la clase FormBuilder
   * @param _snk Inyeccion del servicio SnackBarService
   * @param mainService Inyeccion del servicio DptoService
   * @param paisService Inyeccion del servicio PaisService
   * @param dialogRef Inyeccion de la clase MatDialogRef
   * @param data Data que se recibe como parametro
   */
  constructor(
    private fb: FormBuilder,
    private _snk: SnackBarService,
    private mainService: DptoService,
    private paisService: PaisService,
    public dialogRef: MatDialogRef<DptoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data !== null) {
      this.getPaises();
      if (this.data.hasOwnProperty('create')) {
        this.create = this.data.create;
      }
      if (this.data.hasOwnProperty('data')) {
        this.mainForm.patchValue({
          codigo: this.data.data.codigo,
          nombre: this.data.data.nombre,
          pais: this.data.data.pais.codigo
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
        this.mapPaises = res.reduce(function (map: any, obj: any) {
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
    const obj: Dpto = {
      codigo: this.mainForm.value.codigo,
      nombre: this.mainForm.value.nombre,
      pais: this.mapPaises[this.mainForm.value.pais]
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
  post(obj: Dpto): void {
    this.mainService.add(obj)
      .subscribe((res: any) => {
        if (res !== undefined && res !== null && res.hasOwnProperty('ownHandle')) {
          this._snk.show(res.message);
          console.error(res.object);
        } else {
          this.mainForm.reset();
          this._snk.show('Departamento creado exitosamente!');
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
  put(id: string, obj: Dpto): void {
    this.mainService.update(id, obj)
      .subscribe((res: any) => {
        if (res !== undefined && res !== null && res.hasOwnProperty('ownHandle')) {
          this._snk.show(res.message);
          console.error(res.object);
        } else {
          this.mainForm.reset();
          this._snk.show('Departamento actualizado exitosamente!');
          this.dialogRef.close();
        }
      }, err => {
        this._snk.show('Se presento un error grave, favor verificar la consola');
        console.error(err);
      });
  }
}