import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CONFIG } from './config/config';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EntryFinderService {
  private isBlogVersion = CONFIG.BLOG_VERSION;
  private baseUrl = CONFIG.URL_BACKEND;

  private appId = CONFIG.APP_ID;
  private urlGetEntry = this.baseUrl + "/entries/entry_view/" + this.appId;
  private urlListEntries = this.baseUrl + "/entries/entry_list/" + this.appId;
  private urlListHiddenEntries = this.baseUrl + "/entries/entry_list_hidden/" + this.appId;
  private urlListAllEntries = this.baseUrl + "/entries/entry_list_all/" + this.appId;

  public mainPageName = CONFIG.MAIN_PAGE_NAME;
  public aboutPageName = CONFIG.ABOUT_PAGE_NAME;
  public personalInfoPage = CONFIG.PERSONAL_INFO_PAGE_NAME;

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

  getMainPage() {
    return this.http
      .get(this.urlGetEntry + "/" + this.mainPageName//, 
      //{headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)}
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  getAboutPage() {
    return this.http
      .get(this.urlGetEntry + "/" + this.aboutPageName//, 
      //{headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)}
      )
      .pipe(
        catchError(this.handleError)
      );
  }
  getPersonalInfo() {
    return this.http
      .get(this.urlGetEntry + "/" + this.personalInfoPage//, 
      //{headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)}
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  listEntries() {
    return this.http
      .get(this.urlListEntries//, 
      //{headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)}
      ) 
      .pipe(
        catchError(this.handleError)
      );
  }

  listEntriesHidden() {
    return this.http
      .get(this.urlListHiddenEntries, 
      {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)}
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  listEntriesAll() {
    return this.http
      .get(this.urlListAllEntries, 
      {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)}
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
