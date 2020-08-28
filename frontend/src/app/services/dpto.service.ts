import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Dpto } from '../interfaces/dpto';
import { Response } from '../interfaces/response';
import { ResponseService } from './response.service';

const apiUrl = 'http://localhost:8080/api/dpto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DptoService {

  /**
   * Constructor del servicio
   * @param http Inyeccion de la clase HttpClient
   * @param rspSrv Inyeccion del servicio ResponseService
   */
  constructor(private http: HttpClient, private rspSrv: ResponseService)  { }

  /**
   * Metodo para obtener todos los datos de la entidad Dpto
   */
  getAll(): Observable<Response> {
    return this.http.get<Dpto[]>(`${apiUrl}`)
      .pipe(
        tap(objs => this.rspSrv.doResponse('fetched', false, objs)),
        catchError(err => this.rspSrv.doResponse('err', true, err))
      );
  }

  /**
   * Metodo para persistir la entidad Dpto
   * @param obj Objeto Dpto
   */
  add(obj: Dpto): Observable<Response> {
    return this.http.post<Dpto>(apiUrl, obj, httpOptions).pipe(
      tap((o: Dpto) => this.rspSrv.doResponse('add', false, o)),
      catchError(err => this.rspSrv.doResponse('err', true, err))
    );
  }

  /**
   * Metodo para actualizar la entidad Dpto
   * @param id Llave de la entidad
   * @param obj Objeto Dpto
   */
  update(id: string, obj: Dpto): Observable<Response> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, obj, httpOptions).pipe(
      tap(obj => this.rspSrv.doResponse('updated', false, obj)),
      catchError(err => this.rspSrv.doResponse('err', true, err))
    );
  }

  /**
   * Metodo para eliminar la entidad Dpto
   * @param id Llave de la entidad
   */
  delete(id: string): Observable<Response> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Dpto>(url, httpOptions).pipe(
      tap(obj => this.rspSrv.doResponse('delete', false, obj)),
      catchError(err => this.rspSrv.doResponse('err', true, err))
    );
  }
}