import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Subscription } from 'rxjs/Subscription';
import { EntryDTO } from '../DTO/entryDTO';
import { CategoryDTO } from '../DTO/categoryDTO';
import { UtilsDateService } from '../utils-date.service';
import { ColorUtilsService } from '../color-utils.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoryList:CategoryDTO[];
  catSubscription: Subscription;
  error:any;
  constructor( public categoriesService: CategoriesService, 
    public utilsDate:UtilsDateService, public colorUtils:ColorUtilsService) { }

  ngOnInit() {
    this.getEntryList();
}
getEntryList() {
 this.catSubscription = this.categoriesService.listCategories()
   .subscribe(
   data => {this.categoryList = data; console.log(data);},
   err => error => this.error = err,
   () => { console.log(this.categoryList)}
   );
}

 timeSince(date:Date) {
   return this.utilsDate.timeSince(date);
}
 calculateColor(str:string) {
   return this.colorUtils.stringToColour(str);
 }
}

