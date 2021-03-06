import { Component, OnInit,Output, Input} from '@angular/core';
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";
import { Subscription } from 'rxjs/Subscription';
import { FileUploaderService } from '../file-uploader.service';
import { FileDTO } from '../DTO/fileDTO';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  fileToUpload: File = null;
  @Output() filename:string;
  @Input() fromDialog;
  message:string ="";
  fileDTO : FileDTO = new FileDTO();
  getFileSubscription: Subscription;
  uploadFileSubscription: Subscription;

  constructor(public fileUploader:FileUploaderService,  private router: Router) { }

  ngOnInit() {
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.filename=files.item(0).name;
    this.fileDTO.filename=this.filename;
    console.log(this.fileToUpload);
    
    this.getFileSubscription = this.readFile(this.fileToUpload).subscribe(params => {
      this.fileDTO.base64=params.result;
      console.log(params.toString());
      this.fileDTO.base64=params.toString();
      console.log(this.fileDTO);
   });
}

public readFile(fileToRead: File): Observable<MSBaseReader>{
  let base64Observable = new ReplaySubject<MSBaseReader>(1);

  let fileReader = new FileReader();
  fileReader.onload = event => {
      base64Observable.next(fileReader.result);
  };
  fileReader.readAsDataURL(fileToRead);

  return base64Observable;
 }

 public onClickButton(): void { 
  this.uploadFileSubscription = this.fileUploader.postFile (this.fileDTO).subscribe(
    data => {},
    err => {},
    () => {
      if (this.fromDialog) {
        this.message="uploaded succesfully!";
      }
      else {
        this.router.navigate(['./files'])};
      }
    
  );
}

}


