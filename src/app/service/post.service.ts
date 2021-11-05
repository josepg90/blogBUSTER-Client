
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { API_URL, environment, httpOptions } from 'src/environments/environment';


import { catchError, retry, shareReplay, tap } from 'rxjs/operators';
import { IAdd, IPage, IPost } from '../model/model-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  sURL = API_URL + '/post';

  onCheck = new EventEmitter<any>();

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
      if (environment) console.log("SessionService: error: " + errorMessage);
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (environment) console.log("SessionService: error: " + errorMessage);
    }
    return throwError(errorMessage);
  }

  login(loginData: String): Observable<String> {
    if (environment) console.log("SessionService: login");
    return this.http.post<String>(this.sURL, loginData, httpOptions).pipe(
      tap((u: String) => console.log("session.service login HTTP request executed", u)),
      retry(1),
      catchError(this.handleError));
  }

  logout(): Observable<String> {
    if (environment) console.log("SessionService: logout");
    return this.http.delete<String>(this.sURL, httpOptions).pipe(
      retry(1),
      catchError(this.handleError));
  }
  
  getPage(rpp: number, page: number, param: String, direction: String, filtro: String): Observable<IPage> {    
    return this.http.get<IPage>(this.sURL + "?rpp=" + rpp + "&page=" + page + "&param=" + param + "&direction=" + direction  + "&filtro=" + filtro, httpOptions);
  }

  getAll(rpp: number, page: number): Observable<IPage> {    
    return this.http.get<IPage>(this.sURL + "?rpp=" + rpp + "&page=" + page, httpOptions);
  }

  getPost(id: number): Observable<IPost> {
    return this.http.get<IPost>(this.sURL + "?id=" + id, httpOptions);
  }

  create(newData: IAdd): Observable<number> {
    return this.http.post<number>(this.sURL, newData, httpOptions)
  }

  delete(id: number): Observable<Number> {
    return this.http.delete<Number>(this.sURL + "?id=" + id, httpOptions)
  }

  update(newData: string): Observable<String> {
    return this.http.put<String>(this.sURL, newData, httpOptions)
  }

}
