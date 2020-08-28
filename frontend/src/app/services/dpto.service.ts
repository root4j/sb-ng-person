import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Dpto } from '../interfaces/dpto';

const apiUrl = 'http://localhost:8080/api/dpto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DptoService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAll(): Observable<Dpto[]> {
    return this.http.get<Dpto[]>(`${apiUrl}`)
      .pipe(
        tap(objs => console.log('fetched objs')),
        catchError(this.handleError('getAll', []))
      );
  }

  add(obj: Dpto): Observable<Dpto> {
    return this.http.post<Dpto>(apiUrl, obj, httpOptions).pipe(
      tap((o: Dpto) => console.log(`added obj w/ id=${o.codigo}`)),
      catchError(this.handleError<Dpto>('add'))
    );
  }

  update(id: string, obj: Dpto): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, obj, httpOptions).pipe(
      tap(_ => console.log(`updated obj id=${id}`)),
      catchError(this.handleError<any>('update'))
    );
  }

  delete(id: string): Observable<Dpto> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Dpto>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted obj id=${id}`)),
      catchError(this.handleError<Dpto>('delete'))
    );
  }
}