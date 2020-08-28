import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogModel } from '../../interfaces/confirm-dialog-model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  /**
   * Atributo titulo del componente
   */
  title: string;
  /**
   * Atributo mensaje del componente
   */
  message: string;

  /**
   * Constructor del componente
   * @param dialogRef Inyeccion de la clase MatDialogRef
   * @param data Data que se recibe como parametro
   */
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

  /**
   * Metodo que confirma la accion al padre
   */
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  /**
   * Metodo que niega la accion al padre
   */
  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}