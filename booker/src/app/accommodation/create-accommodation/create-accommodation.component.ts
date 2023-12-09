import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MapComponent} from "../../map/map.component";
import {SnackBarComponent} from "../../shared/snack-bar/snack-bar.component";
import {AccommodationType} from "../../enums/accommodation-type";
import {CreateAccommodation} from "./model/create-accommodation.model";
import {AccommodationService} from "../accommodation.service";
import {Price} from "../accommodation/model/price.model";
import {PriceType} from "../../enums/price-type.enum";
import {Image} from "../accommodation/model/Image";
import {environment} from "../../../env/env";

interface SelectedFile {
  name: string;
  url: string;
}
@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css'],

})
export class CreateAccommodationComponent implements OnInit{
  address: string = '';
  formGroupNameDescType = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      accommodation_type: new FormControl("Studio", [Validators.required])
  })

  formGroupLocation = new FormGroup({
    lat: new FormControl(45.2396, [Validators.required]),
    lng: new FormControl(19.8227, [Validators.required])
  })

  formGroupPhotos = new FormGroup({
    photos: new FormControl()
  })

  formGroupMinMaxCapacity = new FormGroup({
    minCapacity: new FormControl(1, [Validators.required]),
    maxCapacity: new FormControl(10, [Validators.required])
  })

  formGroupAvailability = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  })

  formGroupPrice = new FormGroup({
    priceStartDate: new FormControl(),
    priceEndDate: new FormControl(),
    amount: new FormControl(100.0, [Validators.required]),
    price_type: new FormControl('PER_GUEST', [Validators.required])
  })

  formGroupAmenities = new FormGroup({
    amenities: new FormControl()
  })
  selectedFiles: SelectedFile[] = [];

  constructor(private fb : FormBuilder, private renderer: Renderer2, private accommodationService: AccommodationService,
              private snackBar : SnackBarComponent, private map: MapComponent) {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openSnackBar(message, action);
    const price: Price = {
      cost: this.formGroupPrice.value.amount!,
      fromDate: this.formGroupPrice.value.priceStartDate,
      toDate: this.formGroupPrice.value.priceEndDate,
      type: (this.formGroupPrice.value.price_type === "PER_ACCOMMODATION") ? PriceType.PER_ACCOMMODATION : PriceType.PER_GUEST,
    };
    let accType = AccommodationType.STUDIO;
    if(this.formGroupNameDescType.value.accommodation_type === "Studio"){
      accType = AccommodationType.STUDIO;
    }else if(this.formGroupNameDescType.value.accommodation_type === "Room"){
      accType = AccommodationType.ROOM;
    }

    const image: Image = {
      path: 'asd',
    }
    let imgs : Image[] = []
    imgs.push(image)
    const accommodation: CreateAccommodation = {
      title: this.formGroupNameDescType.value.name!,
      description: this.formGroupNameDescType.value.description!,
      type: accType,
      address: '',
      amenities: [],
      images: imgs,
      startDate: this.formGroupAvailability.value.startDate!,
      endDate: this.formGroupAvailability.value.endDate!,
      price: price,
      minCapacity: this.formGroupMinMaxCapacity.value.minCapacity!,
      maxCapacity: this.formGroupMinMaxCapacity.value.maxCapacity!,
    };
    this.accommodationService.add(accommodation).subscribe(
        {
          next: () => {
          },
          error: (_) => {
            this.snackBar.openSnackBar('error happened', action);
          }
        }
    );


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
    // var location = event.latLng;
    // console.log(location);
    this.formGroupLocation.value.lat = Number(localStorage.getItem("lat")!);
    this.formGroupLocation.value.lng = Number(localStorage.getItem("lng")!);

  }




  ngOnInit(): void {

  }




}



