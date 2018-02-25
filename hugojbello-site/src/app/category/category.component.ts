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
  entryList:EntryDTO[];
  entryListInPage:EntryDTO[];
  categoryFinderSubscription: Subscription;
  pageNow:number=1;
  totalItems:number;
  itemsPerPage:number=10;
  error:any;

  constructor(private route: ActivatedRoute, public categoriesService: CategoriesService,  public utilsDate:UtilsDateService) {}

  
  ngOnInit() {
    this.categoryFinderSubscription = this.route.params.subscribe(params => {
       this.categoryName = params['id'].toString(); 
       this.getEntriesinCategory();
 
    });
  }

  ngOnChanges(){
    this.getEntriesinCategory();
  }
  getEntriesinCategory() {
    this.categoryFinderSubscription = this.categoriesService.getEntriesInCategory(this.categoryName)
      .subscribe(
      data => {this.entryList = data; console.log(data);},
      err => error => this.error = err,
      () => {this.updateList(); this.totalItems= this.entryList.length; }
      );
  }

  ngOnDestroy() {
    this.categoryFinderSubscription.unsubscribe();
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
