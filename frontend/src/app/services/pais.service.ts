import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Pais } from '../interfaces/pais';
import { Response } from '../interfaces/response';
import { ResponseService } from './response.service';

const apiUrl = 'http://localhost:8080/api/pais';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  /**
   * Constructor del servicio
   * @param http Inyeccion de la clase HttpClient
   * @param rspSrv Inyeccion del servicio ResponseService
   */
  constructor(private http: HttpClient, private rspSrv: ResponseService)  { }

  /**
   * Metodo para obtener todos los datos de la entidad Pais
   */
  getAll(): Observable<Response> {
    return this.http.get<Pais[]>(`${apiUrl}`)
      .pipe(
        tap(objs => this.rspSrv.doResponse('fetched', false, objs)),
        catchError(err => this.rspSrv.doResponse('err', true, err))
      );
  }

  /**
   * Metodo para persistir la entidad Pais
   * @param obj Objeto Pais
   */
  add(obj: Pais): Observable<Response> {
    return this.http.post<Pais>(apiUrl, obj, httpOptions).pipe(
      tap((o: Pais) => this.rspSrv.doResponse('add', false, o)),
      catchError(err => this.rspSrv.doResponse('err', true, err))
    );
  }

  /**
   * Metodo para actualizar la entidad Pais
   * @param id Llave de la entidad
   * @param obj Objeto Pais
   */
  update(id: string, obj: Pais): Observable<Response> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, obj, httpOptions).pipe(
      tap(obj => this.rspSrv.doResponse('updated', false, obj)),
      catchError(err => this.rspSrv.doResponse('err', true, err))
    );
  }

  /**
   * Metodo para eliminar la entidad Pais
   * @param id Llave de la entidad
   */
  delete(id: string): Observable<Response> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Pais>(url, httpOptions).pipe(
      tap(obj => this.rspSrv.doResponse('delete', false, obj)),
      catchError(err => this.rspSrv.doResponse('err', true, err))
    );
  }
}