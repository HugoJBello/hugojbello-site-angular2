import { Component, OnInit } from '@angular/core';
import { EntryFinderService } from '../entry-finder.service';
import { AuthService } from '../auth/auth.service';
import { EntryDTO } from '../DTO/entryDTO';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  entryName: string;
  contentHtml: string;
  entryDTO: EntryDTO;
  entryFinderSubscription: Subscription;
  error:any;

  constructor(public entryFinder: EntryFinderService,
    public authService: AuthService) {}


  ngOnInit() {
    this.getMainPage();
  }

  ngOnDestroy() {
    this.entryFinderSubscription.unsubscribe();
  }

  getMainPage() {
    this.entryFinderSubscription = this.entryFinder.getMainPage()
      .subscribe(
      data => {this.entryDTO = data.entry; this.contentHtml=data.contentHtml; console.log(data);},
      err => error => this.error = err,
      () => { console.log(this.entryDTO)}
      );
  }
}
