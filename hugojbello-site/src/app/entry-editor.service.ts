import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CONFIG } from './config/config';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { EntryDTO } from './DTO/entryDTO';

@Injectable()
export class EntryEditorService {
  private baseUrl = CONFIG.URL_BACKEND;
  private urlPostEntry = this.baseUrl + "/editor/entry_editor";

  constructor(private http: HttpClient) { }
  
  postEntry (entryDTO: EntryDTO): Observable<EntryDTO> {
    console.log(this.baseUrl);
     return this.http.post<EntryDTO>(this.urlPostEntry, entryDTO)
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

