import { Component, OnInit } from '@angular/core';
import { EntryFinderService } from '../entry-finder.service';
import { Subscription } from 'rxjs/Subscription';
import { EntryDTO } from '../DTO/entryDTO';
import { UtilsDateService } from '../utils-date.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  entryList:EntryDTO[];
  entryListInPage:EntryDTO[];
  entryFinderSubscription: Subscription;
  pageNow:number=1;
  totalItems:number;
  itemsPerPage:number=10;
  error:any;

  constructor(public entryFinder: EntryFinderService, 
    public authService: AuthService,
    public utilsDate:UtilsDateService) {}

  ngOnInit() {
    this.getEntryList();
  }

  onHidden(){
    this.getEntryListHidden();
  }

  onVisible(){
    this.getEntryList();
  }

  onAll(){
    this.getEntryListAll();
  }

  getEntryList() {
    this.entryFinderSubscription = this.entryFinder.listEntries()
      .subscribe(
      data => {this.entryList = data},
      err => error => this.error = err,
      () => { this.updateList(); this.totalItems= this.entryList.length; console.log(this.entryList);console.log(this.totalItems);}
      );
  }

  getEntryListHidden() {
    this.entryFinderSubscription = this.entryFinder.listEntriesHidden()
      .subscribe(
      data => {this.entryList = data},
      err => error => this.error = err,
      () => { this.updateList(); this.totalItems= this.entryList.length; console.log(this.entryList);console.log(this.totalItems);}
      );
  }

  getEntryListAll() {
    this.entryFinderSubscription = this.entryFinder.listEntriesAll()
      .subscribe(
      data => {this.entryList = data},
      err => error => this.error = err,
      () => { this.updateList(); this.totalItems= this.entryList.length; console.log(this.entryList);console.log(this.totalItems);}
      );
  }


  timeSince(date:Date) {
      return this.utilsDate.timeSince(date);
  }

  updateList(){
    var firstEntry=(this.pageNow -1)*this.itemsPerPage;
    var lastEntry= firstEntry + this.itemsPerPage;//(this.pageNow -1)*(this.itemsPerPage+1);
    console.log("(" + firstEntry + " " + lastEntry + ")");
    this.entryListInPage = this.entryList.slice(firstEntry, lastEntry);

  }
  pageChanged(page){
  this.pageNow = page;
  this.updateList();
  }

}
