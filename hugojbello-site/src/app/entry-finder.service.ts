import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CONFIG } from './config/config';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EntryFinderService {
  private baseUrl = CONFIG.URL_BACKEND;
  private urlGetEntry = this.baseUrl + "/entries/entry_view";
  
  constructor(private http: HttpClient) { }  // Implement a method to get the private deals

  getEntry(entryName) {
    return this.http
      .get(this.urlGetEntry + "/" + entryName//, 
      //{headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)}
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return Observable.throw(err.message || err);
  }

}