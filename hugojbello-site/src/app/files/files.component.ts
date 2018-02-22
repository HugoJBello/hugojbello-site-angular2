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
  limit:number = 10;
  getFilesSubscription: Subscription;
  filesDTO : FileDTO[];
  error : any;
  uploadFileSubscription: Subscription;
  urlBase: string;

  constructor(public fileUploader:FileUploaderService) { }

  ngOnInit() {
    this.getEntryList();
  }

  getEntryList() {
    this.urlBase = this.fileUploader.baseUrl+"/images/image/";
    this.getFilesSubscription = this.fileUploader.getLastFiles(this.limit)
      .subscribe(
      data => {this.filesDTO = data; console.log(data);},
      err => error => this.error = err,
      () => { }
      );
  }

}
