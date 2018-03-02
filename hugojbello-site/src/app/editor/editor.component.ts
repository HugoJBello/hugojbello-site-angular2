import { Component, OnInit } from '@angular/core';
import { EntryDTO } from '../DTO/entryDTO';
import {EntryEditorService} from '../entry-editor.service';
import { Subscription } from 'rxjs/Subscription';
import { EntryFinderService } from '../entry-finder.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CONFIG } from '../config/config'
import { MatDialog } from '@angular/material';
import { DialogUploadComponent } from '../dialog-upload/dialog-upload.component';
import { DialogFileSelectorComponent } from '../dialog-file-selector/dialog-file-selector.component';

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
  hidden:boolean = false;

  title:string= "title";
  entryDTO: EntryDTO = new EntryDTO();
  entryFinderSubscription: Subscription;
  error:any;
  isNew:string = "true";
  selectedImages:string[];
  private sub: any;

  constructor( public entryEditor: EntryEditorService, private router:Router,
    private route: ActivatedRoute, public entryFinder: EntryFinderService,
    public dialog: MatDialog) { }


  ngOnChange(){
   }
  onChangeHidden(){
    this.hidden=!this.hidden
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
    this.entryDTO.hidden=this.hidden;
    this.entryDTO.blog_version=CONFIG.BLOG_VERSION;
    this.entryDTO.app_id=CONFIG.APP_ID;

    var trimmedCategories =[];
    if (this.categories){
      for (var cat of this.categories.split(";")){
        trimmedCategories.push(cat.trim());
      }
    }
    this.entryDTO.categories=trimmedCategories;
    
    this.subs = this.entryEditor.postEntry (this.entryDTO).subscribe(
      data => {},
      err => {},
      () => {this.router.navigate(['./entry/' + this.entryDTO.name]);}
    );

    
  }

  public onDeleteButton(): void { 
    if (window.confirm('Are sure you want to delete this item ?')){
      this.subs = this.entryEditor.removeEntry (this.entryDTO.name).subscribe(
        data => {},
        err => {},
        () => {this.router.navigate(['./entries']);}
      );
    }    
  }
  public onUploadImage(): void {  
    let dialogRef = this.dialog.open(DialogUploadComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  public onSelectImage(): void {  
    let dialogRef = this.dialog.open(DialogFileSelectorComponent, {
      height: '600px',
      width: '600px',
    });
    
    const subSelected = dialogRef.componentInstance.selectedFile.subscribe( (selectedImages)=>{
      this.selectedImages=[];
      if(selectedImages){
        for (var image of selectedImages){
         this.selectedImages.push(CONFIG.URL_BACKEND + "/images/image/" + image);
        }
      }
    });

    const subUse = dialogRef.componentInstance.useButton.subscribe( ()=>{
      for (var url of this.selectedImages){
        this.text = this.text + "\n ![](" + url + ")";
      }
      this.dialog.closeAll();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    
    });
  }
  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       if (params['id']) this.entryName = params['id'].toString(); 
       this.title = this.entryName;
       this.getEntry();
 
    });
  }
  getEntry() {
    this.entryFinderSubscription = this.entryFinder.getEntry(this.entryName)
      .subscribe(
      data => {this.entryDTO = data.entry;console.log(data);},
      err => error => this.error = err,
      () => {
         if(this.entryDTO) {
         if (this.entryDTO.name) this.isNew="false";
       
         this.title = this.entryDTO.title; 
         this.text = this.entryDTO.content;
         this.categories = this.categoriesFromArray(this.entryDTO.categories);
         this.hidden = this.entryDTO.hidden;
        }
      }
      );
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
  
}
