import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntryDTO } from '../DTO/entryDTO';
import { Subscription } from 'rxjs/Subscription';
import { EntryFinderService } from '../entry-finder.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit, OnDestroy {
  entryName: string;
  contentHtml: string;
  entryDTO: EntryDTO;
  entryFinderSubscription: Subscription;
  error:any;
  private sub: any;

  constructor(private route: ActivatedRoute, public entryFinder: EntryFinderService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.entryName = params['id'].toString(); 
       this.getEntry();
 
    });
  }

  ngOnChanges(){
    this.getEntry();
  }
  getEntry() {
    this.entryFinderSubscription = this.entryFinder.getEntry(this.entryName)
      .subscribe(
      data => {this.entryDTO = data.entry; this.contentHtml=data.contentHtml; console.log(data);},
      err => error => this.error = err,
      () => { console.log(this.entryDTO)}
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}