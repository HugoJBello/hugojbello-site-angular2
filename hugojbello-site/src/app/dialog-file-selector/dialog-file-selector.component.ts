import { Component, OnInit, Inject, Output,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-file-selector',
  templateUrl: './dialog-file-selector.component.html',
  styleUrls: ['./dialog-file-selector.component.css']
})
export class DialogFileSelectorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogFileSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    @Output() selectedFile =new EventEmitter<string[]>();

    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit(){

    }

    uploadedFile(filename){
      this.selectedFile.emit(filename);
    }
}
