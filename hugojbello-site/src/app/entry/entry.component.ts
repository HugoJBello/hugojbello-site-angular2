import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntryDTO } from '../DTO/entryDTO';
import { Subscription } from 'rxjs/Subscription';
import { EntryFinderService } from '../entry-finder.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit, OnDestroy {
  entryName: string;
  contentHtml: string;
  entryDTO: EntryDTO;
  entryFinderSubscription: Subscription;
  error:any;
  private sub: any;

  constructor(private route: ActivatedRoute, public entryFinder: EntryFinderService,
    public authService: AuthService) {}

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

  formatDate(date) {
    date = (!date)? new Date() : new Date(date);
    return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
  }
}