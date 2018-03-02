import { Component, OnInit,Output, Input,EventEmitter } from '@angular/core';
import { FileUploaderService } from '../file-uploader.service';
import { Subscription } from 'rxjs/Subscription';
import { FileDTO } from '../DTO/fileDTO';
import { CONFIG } from '../config/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  pageNow:number = 1;
  pagesTotal:number = 1;
  totalItems:number;
  @Input() itemsPerPage:number=10;

  getFilesSubscription: Subscription;
  filesDTO : FileDTO[];
  error : any;
  uploadFileSubscription: Subscription;
  urlBase: string;

  @Input() fromDialog:boolean = false;
  @Input() redirectTo:string="";

  selectedFilesArr:string[]=[];
  @Output() selectedFile =new EventEmitter<string[]>();
  

  constructor(public fileUploader:FileUploaderService) { }

  ngOnInit() {
    this.getListFilesPaged();
  }

  getListFilesPaged() {
    this.urlBase = this.fileUploader.baseUrl+"/images/image/";
    this.getFilesSubscription = this.fileUploader.getImagesListPage(this.pageNow,this.itemsPerPage)
      .subscribe(
      data => {this.filesDTO = data.files; this.pagesTotal=data.pages; this.totalItems=data.totalItems; console.log(data);},
      err => error => this.error = err,
      () => {console.log(this.totalItems + " " + this.pageNow + " " + this.itemsPerPage) }
      );
  }

  pageChanged(page){
    this.pageNow = page;
    this.getListFilesPaged();
    }

    fileSelected(filename){
      if (!this.alreadySelected(filename)) this.selectedFilesArr.push(filename);
      else {
        var index = this.selectedFilesArr.indexOf(filename);
        this.selectedFilesArr.splice(index,1);
      }
      this.selectedFile.emit(this.selectedFilesArr);
    }

    alreadySelected(filename){
      return(this.selectedFilesArr.indexOf(filename)>-1);
    }

    delete(filename){
      if (window.confirm('Are sure you want to delete this item ?')){
      this.getFilesSubscription = this.fileUploader.fileRemove(filename)
      .subscribe(
      data => {console.log(data)},
      err => error => this.error = err,
      () => { this.getListFilesPaged();}
      );
  }
}
       
}
