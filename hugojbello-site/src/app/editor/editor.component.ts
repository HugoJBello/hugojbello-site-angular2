import { Component, OnInit } from '@angular/core';
import { EntryDTO } from '../DTO/entryDTO';
import {EntryEditorService} from '../entry-editor.service';
import { Subscription } from 'rxjs/Subscription';
import { EntryFinderService } from '../entry-finder.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  subs: Subscription;
  text:string;
  entryName: string;
  categories:string;

  title:string= "title";
  entryDTO: EntryDTO = new EntryDTO();
  entryFinderSubscription: Subscription;
  error:any;
  isNew:string = "true";

  private sub: any;

  constructor( public entryEditor: EntryEditorService,
    private route: ActivatedRoute, public entryFinder: EntryFinderService) { }


  ngOnChange(){
    console.log(this.text);
  }

  titleToFilename(title){
    var name = '';
    if (title) name=title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return name;
    }
  
   categoriesFromArray(array: string[]){
    var categories = ""; 
    for (var entry of array){
      if(entry) categories = categories + ";" + entry;
     }
     return categories.replace(";","");
   }
  public onPostButton(): void { 
    if (!this.entryDTO) this.entryDTO=new EntryDTO();
    this.entryDTO.title = this.title;
    this.entryDTO.created_at = new Date();
    this.entryDTO.name = this.titleToFilename(this.title);
    this.entryDTO.content = this.text;
    this.entryDTO.new = this.isNew;
    this.entryDTO.categories=this.categories.split(";");
    console.log(this.entryDTO);

    this.subs = this.entryEditor.postEntry (this.entryDTO).subscribe(
      data => {console.log(data);},
      err => {}
    );
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       if (params['id']) this.entryName = params['id'].toString(); 
       this.getEntry();
 
    });
  }
  getEntry() {
    this.entryFinderSubscription = this.entryFinder.getEntry(this.entryName)
      .subscribe(
      data => {this.entryDTO = data.entry;console.log(data);},
      err => error => this.error = err,
      () => {
        console.log(this.entryDTO);
        if(this.entryDTO) {
         if (this.entryDTO.name) this.isNew="false";
       
         this.title = this.entryDTO.title; 
         this.text = this.entryDTO.content;
         this.categories = this.categoriesFromArray(this.entryDTO.categories);
        }
      }
      );
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
  
}
