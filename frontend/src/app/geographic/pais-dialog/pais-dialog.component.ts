import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Pais } from '../../interfaces/pais'
import { PaisService } from '../../services/pais.service'
import { SnackBarService } from '../../services/snack-bar.service';


@Component({
  selector: 'app-pais-dialog',
  templateUrl: './pais-dialog.component.html',
  styleUrls: ['./pais-dialog.component.css']
})
export class PaisDialogComponent {
  /**
   * Instancia del formario
   */
  mainForm = this.fb.group({
    codigo: [null, Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(2)])
    ],
    nombre: [null, Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(200)])
    ]
  });

  /**
   * Variable que permite determinar si el formario es para editar o crear
   */
  create: boolean = false;

  /**
   * Constructor del componente
   * @param fb Inyeccion de la clase FormBuilder
   * @param _snk Inyeccion del servicio SnackBarService
   * @param mainService Inyeccion del servicio PaisService
   * @param dialogRef Inyeccion de la clase MatDialogRef
   * @param data Data que se recibe como parametro
   */
  constructor(
    private fb: FormBuilder,
    private _snk: SnackBarService,
    private mainService: PaisService,
    public dialogRef: MatDialogRef<PaisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data !== null) {
      if (data.hasOwnProperty('create')) {
        this.create = data.create;
      }
      if (data.hasOwnProperty('data')) {
        this.mainForm.setValue({
          codigo: data.data.codigo,
          nombre: data.data.nombre
        });
      }
    }
  }

  /**
   * Metodo encargado de persistir la informacion
   */
  onSubmit(): void {
    const obj: Pais = {
      codigo: this.mainForm.value.codigo,
      nombre: this.mainForm.value.nombre
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
  post(obj: Pais): void {
    this.mainService.add(obj)
      .subscribe((res: any) => {
        if (res !== undefined && res !== null && res.hasOwnProperty('ownHandle')) {
          this._snk.show(res.message);
          console.error(res.object);
        } else {
          this.mainForm.reset();
          this._snk.show('Pais creado exitosamente!');
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
  put(id: string, obj: Pais): void {
    this.mainService.update(id, obj)
      .subscribe((res: any) => {
        if (res !== undefined && res !== null && res.hasOwnProperty('ownHandle')) {
          this._snk.show(res.message);
          console.error(res.object);
        } else {
          this.mainForm.reset();
          this._snk.show('Pais actualizado exitosamente!');
          this.dialogRef.close();
        }
      }, err => {
        this._snk.show('Se presento un error grave, favor verificar la consola');
        console.error(err);
      });
  }
}