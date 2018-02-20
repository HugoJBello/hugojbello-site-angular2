import { Component, OnInit,Inject } from '@angular/core';
import { EntryFinderService } from '../entry-finder.service';
import { AuthService } from '../auth/auth.service';
import { EntryDTO } from '../DTO/entryDTO';
import { Subscription } from 'rxjs/Subscription';
import { UtilsDateService } from '../utils-date.service';
import { CONFIG } from '../config/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  entryName: string;
  contentHtml: string;
  entryDTO: EntryDTO;
  entryList: EntryDTO[];
  entryFinderSubscription: Subscription;
  sizeTextLimit:number = 300;
  blogVersion:boolean=false;
  error:any;

  constructor(public entryFinder: EntryFinderService, public utilsDate:UtilsDateService) {}

  ngOnInit() {
    this.blogVersion=CONFIG.BLOG_VERSION;
    this.getMainPage();
    this.getEntries();
  }

  ngOnDestroy() {
    this.entryFinderSubscription.unsubscribe();
  }

  getMainPage() {
    this.entryFinderSubscription = this.entryFinder.getMainPage()
      .subscribe(
      data => {this.entryDTO = data.entry; this.contentHtml=data.contentHtml},
      err => error => this.error = err,
      () => {}
      );
  }

  getEntries() {
    this.entryFinderSubscription = this.entryFinder.listEntries()
      .subscribe(
      data => {this.entryList = data; console.log(data);},
      err => error => this.error = err,
      () => { console.log(this.entryDTO)}
      );
  }

  cutEntryText(text:string){
    return text.substring(0,this.sizeTextLimit);
  }
  timeSince(date:Date) {
    return this.utilsDate.timeSince(date);
}
}
