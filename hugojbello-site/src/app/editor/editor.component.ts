import { Component, OnInit } from '@angular/core';
import { EntryDTO } from '../DTO/entryDTO';
import {EntryEditorService} from '../entry-editor.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  subs: Subscription;
  text:string;
  title:string= "title";

  entryDTO : EntryDTO = new EntryDTO();
  constructor( public entryEditor: EntryEditorService) { }

  ngOnInit() {
  }
  ngOnChange(){
    console.log(this.text);
  }

  titleToFilename(title){
    var name = '';
    if (title) name=title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return name;
    }
  
  public onPostButton(): void { 
    this.entryDTO.title = this.title;
    this.entryDTO.created_at = new Date();
    this.entryDTO.name = this.titleToFilename(this.title);
    this.entryDTO.content = this.text;
    console.log(this.entryDTO);

    this.subs = this.entryEditor.postEntry (this.entryDTO).subscribe(
      data => {console.log(data);},
      err => {}
    );
  }
  
}
