import {Component, Input, OnInit} from '@angular/core';
import {Image} from "../accommodation/accommodation/model/Image";
import {PhotoUploadService} from "./photo-upload.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit{
  loading: boolean = false;
  selectedFiles: File[] = [];
  images: Image[] = [];
  urls = new Array<string>();


  constructor(private photoUploadService : PhotoUploadService) {
  }

  ngOnInit(): void {
  }


  detectFiles(event: any) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }




}
