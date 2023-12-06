import {AfterViewInit, Component, Renderer2, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {MatDateRangePicker} from "@angular/material/datepicker";
import {FormBuilder, Validators} from "@angular/forms";
import {MapComponent} from "../../map/map.component";
import {MapService} from "../../map/map.service";
import {SnackBarComponent} from "../../shared/snack-bar/snack-bar.component";
interface SelectedFile {
  name: string;
  url: string;
}
@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css'],

})
export class CreateAccommodationComponent {
  address: string = '';
  selectedFiles: SelectedFile[] = [];
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required]
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required]
  });
  fifthFormGroup = this._formBuilder.group({
    fifthCtrl: ['', Validators.required]
  });
  sixthFormGroup = this._formBuilder.group({
    sixthCtrl: ['', Validators.required]
  });
  seventhFormGroup = this._formBuilder.group({
    seventhCtrl: ['', Validators.required]
  });
  eighthFormGroup = this._formBuilder.group({
    eighthCtrl: ['', Validators.required]
  });
  ninthFormGroup = this._formBuilder.group({
    ninthCtrl: ['', Validators.required]
  })
  tenthFormGroup = this._formBuilder.group({
    tenthCtrl: ['', Validators.required]
  })

  constructor(private _formBuilder : FormBuilder, private renderer: Renderer2, private mapService: MapService,
              private snackBar : SnackBarComponent) {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openSnackBar(message, action);
  }

  onFileInput(event: any): void {
    const files = event.target.files;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (this.isFileTypeAllowed(file.type)) {
          const reader = new FileReader();

          reader.onload = (e) => {
            const url = e.target?.result as string;
            this.selectedFiles.push({name: file.name, url});
          };
          reader.readAsDataURL(file);
        } else {
          alert(`Unsupported file type: ${file.type}. Please select JPG, JPEG, GIF or WEBP.`);
        }
        console.log(`File ${i + 1}:`, file);
      }
    }
  }

  private isFileTypeAllowed(fileType: string) : boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return allowedTypes.includes(fileType);
  }

   currentIndex = 0;

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % document.querySelectorAll('.slider img').length;
        this.updateSlider();
    }

  prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + document.querySelectorAll('.slider img').length) % document.querySelectorAll('.slider img').length;
        this.updateSlider();
    }

    private updateSlider() {
        const slider = document.querySelector('.slider') as HTMLElement;
        this.renderer.setStyle(slider, 'transform', `translateX(-${this.currentIndex * 100}%)`);
    }

    onMapClick(event: any) {
      const lat = event.latLng.lat;
      const lng = event.latLng.lng;

      this.mapService.reverseSearch(lat, lng).subscribe(
        (res) => {
          this.address = res.display_name;
        }
      )
    }


}



