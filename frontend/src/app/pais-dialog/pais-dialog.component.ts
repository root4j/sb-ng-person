import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Pais } from '../interfaces/pais'
import { PaisService } from '../services/pais.service'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-pais-dialog',
  templateUrl: './pais-dialog.component.html',
  styleUrls: ['./pais-dialog.component.css']
})
export class PaisDialogComponent {
  mainForm = this.fb.group({
    codigo: [null, Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(2)])
    ],
    nombre: [null, Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(200)])
    ]
  });

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  create: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
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

  onSubmit() {
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


  showSnack(message: string): void {
    this._snackBar.open(message, 'Aceptar', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  post(obj: Pais): void {
    this.mainService.add(obj)
      .subscribe((res: any) => {
        console.log('Post');
        console.log(res);
        if (res !== undefined && res !== null && res.hasOwnProperty('status') && res.status !== 200) {
          if (res.status === 409) {
            this.showSnack(res.error);
          } else {
            this.showSnack('Se presento un error grave, favor verificar la consola');
          }
        } else {
          this.mainForm.reset();
          this.showSnack('Pais creado exitosamente!');
          this.dialogRef.close();
        }
      }, err => {
        this.showSnack('Se presento un error grave, favor verificar la consola');
        console.error(err);
      });
  }

  put(id: string, obj: Pais): void {
    this.mainService.update(id, obj)
      .subscribe((res: any) => {
        console.log('Put');
        console.log(res);
        if (res !== undefined && res !== null && res.hasOwnProperty('status') && res.status !== 200) {
          if (res.status === 409) {
            this.showSnack(res.error);
          } else {
            this.showSnack('Se presento un error grave, favor verificar la consola');
          }
        } else {
          this.mainForm.reset();
          this.showSnack('Pais actualizado exitosamente!');
          this.dialogRef.close();
        }
      }, err => {
        this.showSnack('Se presento un error grave, favor verificar la consola');
        console.error(err);
      });
  }
}