import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Burger } from './burger';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class BurgerService {

  private BurgersUrl = 'api/burgers';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Burgers from the server */
  getBurgers (): Observable<Burger[]> {
    return this.http.get<Burger[]>(this.BurgersUrl)
      .pipe(
        tap(_ => this.log('fetched Burgers')),
        catchError(this.handleError<Burger[]>('getBurgers', []))
      );
  }

  /** GET burger by id. Return `undefined` when id not found */
  getBurgerNo404<Data>(id: number): Observable<Burger> {
    const url = `${this.BurgersUrl}/?id=${id}`;
    return this.http.get<Burger[]>(url)
      .pipe(
        map(Burgers => Burgers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} burger id=${id}`);
        }),
        catchError(this.handleError<Burger>(`getBurger id=${id}`))
      );
  }

  /** GET burger by id. Will 404 if id not found */
  getBurger(id: number): Observable<Burger> {
    const url = `${this.BurgersUrl}/${id}`;
    return this.http.get<Burger>(url).pipe(
      tap(_ => this.log(`fetched burger id=${id}`)),
      catchError(this.handleError<Burger>(`getBurger id=${id}`))
    );
  }

  /* GET Burgers whose name contains search term */
  searchBurgers(term: string): Observable<Burger[]> {
    if (!term.trim()) {
      // if not search term, return empty burger array.
      return of([]);
    }
    return this.http.get<Burger[]>(`${this.BurgersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found Burgers matching "${term}"`)),
      catchError(this.handleError<Burger[]>('searchBurgers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new burger to the server */
  addBurger (burger: Burger): Observable<Burger> {
    return this.http.post<Burger>(this.BurgersUrl, burger, httpOptions).pipe(
      tap((newBurger: Burger) => this.log(`added burger w/ id=${newBurger.id}`)),
      catchError(this.handleError<Burger>('addBurger'))
    );
  }

  /** DELETE: delete the burger from the server */
  deleteBurger (burger: Burger | number): Observable<Burger> {
    const id = typeof burger === 'number' ? burger : burger.id;
    const url = `${this.BurgersUrl}/${id}`;

    return this.http.delete<Burger>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted burger id=${id}`)),
      catchError(this.handleError<Burger>('deleteBurger'))
    );
  }

  /** PUT: update the burger on the server */
  updateBurger (burger: Burger): Observable<any> {
    return this.http.put(this.BurgersUrl, burger, httpOptions).pipe(
      tap(_ => this.log(`updated burger id=${burger.id}`)),
      catchError(this.handleError<any>('updateBurger'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a burgerService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`burgerService: ${message}`);
  }
}
