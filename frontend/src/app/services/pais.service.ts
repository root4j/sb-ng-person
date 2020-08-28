import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Pais } from '../interfaces/pais';

const apiUrl = 'http://localhost:8080/api/pais';  // URL to web api

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if(error !== null || error !== undefined) {
        console.error(error);
        return of(error as any);
      } else {
        return of(result as T);
      }
    };
  }

  getAll(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${apiUrl}`)
      .pipe(
        tap(objs => console.log('fetched objs')),
        catchError(this.handleError('getAll', []))
      );
  }

  add(obj: Pais): Observable<Pais> {
    return this.http.post<Pais>(apiUrl, obj, httpOptions).pipe(
      tap((o: Pais) => console.log(`added obj w/ id=${o.codigo}`)),
      catchError(this.handleError<Pais>('add'))
    );
  }

  update(id: string, obj: Pais): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, obj, httpOptions).pipe(
      tap(_ => console.log(`updated obj id=${id}`)),
      catchError(this.handleError<any>('update'))
    );
  }

  delete(id: string): Observable<Pais> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Pais>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted obj id=${id}`)),
      catchError(this.handleError<Pais>('delete'))
    );
  }
}