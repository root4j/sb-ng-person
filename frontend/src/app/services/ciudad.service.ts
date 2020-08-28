import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Ciudad } from '../interfaces/ciudad';

const apiUrl = 'http://localhost:8080/api/ciudad';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAll(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${apiUrl}`)
      .pipe(
        tap(objs => console.log('fetched objs')),
        catchError(this.handleError('getAll', []))
      );
  }

  add(obj: Ciudad): Observable<Ciudad> {
    return this.http.post<Ciudad>(apiUrl, obj, httpOptions).pipe(
      tap((o: Ciudad) => console.log(`added obj w/ id=${o.codigo}`)),
      catchError(this.handleError<Ciudad>('add'))
    );
  }

  update(id: string, obj: Ciudad): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, obj, httpOptions).pipe(
      tap(_ => console.log(`updated obj id=${id}`)),
      catchError(this.handleError<any>('update'))
    );
  }

  delete(id: string): Observable<Ciudad> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Ciudad>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted obj id=${id}`)),
      catchError(this.handleError<Ciudad>('delete'))
    );
  }
}
