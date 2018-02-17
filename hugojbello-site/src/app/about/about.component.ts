import { Component, OnInit } from '@angular/core';
import { EntryFinderService } from '../entry-finder.service';
import { AuthService } from '../auth/auth.service';
import { EntryDTO } from '../DTO/entryDTO';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  entryName: string;
  contentHtml: string;
  entryDTO: EntryDTO;
  entryFinderSubscription: Subscription;
  error:any;

  constructor(public entryFinder: EntryFinderService,
    public authService: AuthService) {}


  ngOnInit() {
    this.getAboutPage();
  }

  ngOnDestroy() {
    this.entryFinderSubscription.unsubscribe();
  }

  getAboutPage() {
    this.entryFinderSubscription = this.entryFinder.getAboutPage()
      .subscribe(
      data => {this.entryDTO = data.entry; this.contentHtml=data.contentHtml; console.log(data);},
      err => error => this.error = err,
      () => {}
      );
  }
}
