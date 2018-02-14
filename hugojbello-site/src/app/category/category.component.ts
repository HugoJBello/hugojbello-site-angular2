import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntryDTO } from '../DTO/entryDTO';
import { CategoryDTO } from '../DTO/categoryDTO';
import { Subscription } from 'rxjs/Subscription';
import { EntryFinderService } from '../entry-finder.service';
import { CategoriesService } from '../categories.service';
import { AuthService } from '../auth/auth.service';
import { UtilsDateService } from '../utils-date.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryName: string;
  entryList: EntryDTO[];
  catSubscription: Subscription;
  error:any;
  private sub: any;

  constructor(private route: ActivatedRoute, public categoriesService: CategoriesService,  public utilsDate:UtilsDateService) {}

  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.categoryName = params['id'].toString(); 
       this.getEntriesinCategory();
 
    });
  }

  ngOnChanges(){
    this.getEntriesinCategory();
  }
  getEntriesinCategory() {
    this.catSubscription = this.categoriesService.getEntriesInCategory(this.categoryName)
      .subscribe(
      data => {this.entryList = data; console.log(data);},
      err => error => this.error = err,
      () => { console.log(this.entryList)}
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  timeSince(date:Date) {
    return this.utilsDate.timeSince(date);
}
}
