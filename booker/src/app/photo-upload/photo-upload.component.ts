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


  constructor(private photoUploadService : PhotoUploadService) {
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if(files && files.length > 0) {
      this.selectedFiles = Array.from(files);
    }
  }

  uploadFiles() {
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.loading = true;

      const uploadObservables = this.selectedFiles.map((file: File) =>
        this.photoUploadService.upload(file)
      );

      forkJoin(uploadObservables).subscribe(
        (responses: any[]) => {
          this.images = responses.map(response => response as Image);
          this.loading = false;
        },
        error => {
          console.log("Error uploading files: ", error);
          this.loading = false;
        }
      );
    }
  }


}
