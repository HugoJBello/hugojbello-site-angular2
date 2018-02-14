import { Component, OnInit } from '@angular/core';
import { EntryFinderService } from '../entry-finder.service';
import { Subscription } from 'rxjs/Subscription';
import { EntryDTO } from '../DTO/entryDTO';
import { UtilsDateService } from '../utils-date.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  entryList:EntryDTO[];
  entryFinderSubscription: Subscription;
  error:any;
  constructor(public entryFinder: EntryFinderService, public utilsDate:UtilsDateService) {}

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
      return this.utilsDate.timeSince(date);
  }

}
