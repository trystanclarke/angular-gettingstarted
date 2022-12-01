import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IProduct } from './products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'api/products/products.json';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.productUrl).pipe(
      tap((data) => console.log('All data: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // Client side or network error
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // Server returned an http error code
      errorMessage = `Server returned code ${err.status}, error message: ${err.error.message}`;
    }

    console.error(errorMessage);

    return throwError(() => errorMessage);
  }
}
