import { Component, OnInit } from '@angular/core';
import { FileUploaderService } from '../file-uploader.service';
import { Subscription } from 'rxjs/Subscription';
import { FileDTO } from '../DTO/fileDTO';
import { CONFIG } from '../config/config';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  pageNow:number = 1;
  pagesTotal:number = 1;
  totalItems:number;
  itemsPerPage:number=10;

  getFilesSubscription: Subscription;
  filesDTO : FileDTO[];
  error : any;
  uploadFileSubscription: Subscription;
  urlBase: string;

  constructor(public fileUploader:FileUploaderService) { }

  ngOnInit() {
    this.getListFilesPaged();
  }

  getListFilesPaged() {
    this.urlBase = this.fileUploader.baseUrl+"/images/image/";
    this.getFilesSubscription = this.fileUploader.getImagesListPage(this.pageNow)
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
