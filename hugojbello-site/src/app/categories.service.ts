import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CONFIG } from './config/config';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
@Injectable()
export class CategoriesService {
  private baseUrl = CONFIG.URL_BACKEND;
  private urlEntriesInCat = this.baseUrl + "/categories/entries_in_category";
  private urlListCategories = this.baseUrl + "/categories/category_list";
  constructor(private http: HttpClient) { }  // Implement a method to get the private deals

  getEntriesInCategory(categoryName) {
    return this.http
      .get(this.urlEntriesInCat + "/" + categoryName//, 
      //{headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)}
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  listCategories() {
    return this.http
      .get(this.urlListCategories//, 
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


