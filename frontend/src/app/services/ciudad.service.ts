import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Ciudad } from '../interfaces/ciudad';
import { Response } from '../interfaces/response';
import { ResponseService } from './response.service';

const apiUrl = 'http://localhost:8080/api/ciudad';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  /**
   * Constructor del servicio
   * @param http Inyeccion de la clase HttpClient
   * @param rspSrv Inyeccion del servicio ResponseService
   */
  constructor(private http: HttpClient, private rspSrv: ResponseService)  { }

  /**
   * Metodo para obtener todos los datos de la entidad Ciudad
   */
  getAll(): Observable<Response> {
    return this.http.get<Ciudad[]>(`${apiUrl}`)
      .pipe(
        tap(objs => this.rspSrv.doResponse('fetched', false, objs)),
        catchError(err => this.rspSrv.doResponse('err', true, err))
      );
  }

  /**
   * Metodo para persistir la entidad Ciudad
   * @param obj Objeto Ciudad
   */
  add(obj: Ciudad): Observable<Response> {
    return this.http.post<Ciudad>(apiUrl, obj, httpOptions).pipe(
      tap((o: Ciudad) => this.rspSrv.doResponse('add', false, o)),
      catchError(err => this.rspSrv.doResponse('err', true, err))
    );
  }

  /**
   * Metodo para actualizar la entidad Ciudad
   * @param id Llave de la entidad
   * @param obj Objeto Ciudad
   */
  update(id: string, obj: Ciudad): Observable<Response> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, obj, httpOptions).pipe(
      tap(obj => this.rspSrv.doResponse('updated', false, obj)),
      catchError(err => this.rspSrv.doResponse('err', true, err))
    );
  }

  /**
   * Metodo para eliminar la entidad Ciudad
   * @param id Llave de la entidad
   */
  delete(id: string): Observable<Response> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Ciudad>(url, httpOptions).pipe(
      tap(obj => this.rspSrv.doResponse('delete', false, obj)),
      catchError(err => this.rspSrv.doResponse('err', true, err))
    );
  }
}
