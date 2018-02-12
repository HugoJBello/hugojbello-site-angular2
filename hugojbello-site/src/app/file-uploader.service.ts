import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CONFIG } from './config/config';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { FileDTO } from './DTO/fileDTO'
@Injectable()
export class FileUploaderService {
  private baseUrl = CONFIG.URL_BACKEND;
  private urlPostFile = this.baseUrl + "/files/upload";
  constructor(private http: HttpClient) { }
  
  postFile (fileDTO: FileDTO): Observable<FileDTO> {
     return this.http.post<FileDTO>(this.urlPostFile, fileDTO)
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
