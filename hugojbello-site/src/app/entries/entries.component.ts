import { Component, OnInit } from '@angular/core';
import { EntryFinderService } from '../entry-finder.service';
import { Subscription } from 'rxjs/Subscription';
import { EntryDTO } from '../DTO/entryDTO';
@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  entryList:EntryDTO[];
  entryFinderSubscription: Subscription;
  error:any;
  constructor(public entryFinder: EntryFinderService) {}



  ngOnInit() {
       this.getEntryList();
  }
  getEntryList() {
    this.entryFinderSubscription = this.entryFinder.listEntries()
      .subscribe(
      data => {this.entryList = data; console.log(data);},
      err => error => this.error = err,
      () => { console.log(this.entryList)}
      );
  }

    timeSince(date:Date) {
    var seconds = Math.floor(((new Date()).getTime() - (new Date(date)).getTime()) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

}
