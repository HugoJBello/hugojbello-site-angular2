import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CONFIG } from './config/config';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { FileDTO } from './DTO/fileDTO';


@Injectable()
export class FileUploaderService {
  public baseUrl = CONFIG.URL_BACKEND;
  private urlPostFile = this.baseUrl + "/files/upload";
  private urlRemoveFile = this.baseUrl + "/files/file_remove";

  private urlGetLastFiles = this.baseUrl + "/files/images";
  private urlGetImagesPaged = this.baseUrl + "/images/images_list_page";

  constructor(private http: HttpClient) { }

  postFile(fileDTO: FileDTO): Observable<FileDTO> {
    return this.http.post<FileDTO>(this.urlPostFile, fileDTO,
      {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)})
      .pipe(
      catchError(this.handleError)
      );
  }

  fileRemove(filename:string) {
    return this.http
      .get(this.urlRemoveFile + "/" + filename, 
      {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)}
      )
      .pipe(
        catchError(this.handleError)
      );
  }
  getLastFiles(limit:number) {
    return this.http
      .get(this.urlGetLastFiles + "/" + limit, 
      {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)}
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  getImagesListPage(page:number,perPage:number) {
    return this.http
      .get(this.urlGetImagesPaged + "/" + page+ "/" + perPage)
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
