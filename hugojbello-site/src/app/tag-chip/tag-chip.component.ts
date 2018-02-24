import { Component, OnInit, Input } from '@angular/core';
import { ColorUtilsService } from '../color-utils.service';
@Component({
  selector: 'tag-chip',
  templateUrl: './tag-chip.component.html',
  styleUrls: ['./tag-chip.component.css']
})
export class TagChipComponent implements OnInit {

  constructor(public colorUtils:ColorUtilsService) { }
  @Input() tagName ="";

  ngOnInit(){

  }

 calculateColor(str:string) {
   return this.colorUtils.stringToColour(str);
 }
}

