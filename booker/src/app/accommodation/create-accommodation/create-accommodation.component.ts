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
import {PhotoUploadService} from "../../photo-upload/photo-upload.service";
import {Address} from "../accommodation/model/address.model";
import {AmenityService} from "../../amenity/amenity.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css'],

})
export class CreateAccommodationComponent implements OnInit{
  urls = new Array<string>();
  photos = new Array<Image>();
  amenityNames: string[] = [];
  selectedAmenityNames: { [name: string]: boolean } = {};
  fileNames: string[] = [];
  selectedFiles:File[] = [];
  formGroupNameDescType = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      shortDescription: new FormControl('', [Validators.required]),
      accommodation_type: new FormControl("Studio", [Validators.required])
  })

  formGroupLocation = new FormGroup({
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    lat: new FormControl(0, [Validators.required]),
    lng: new FormControl(0 ,[Validators.required]),
  });

  formGroupPhotos = new FormGroup({
    photos: new FormControl()
  })

  formGroupMinMaxCapacity = new FormGroup({
    min_capacity: new FormControl(1, [Validators.required]),
    max_capacity: new FormControl(10, [Validators.required])
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

  constructor(private fb : FormBuilder, private renderer: Renderer2, private accommodationService: AccommodationService,
              private snackBar : SnackBarComponent, private map: MapComponent, private photoUploadService : PhotoUploadService,
              private amenityService: AmenityService,
              private http: HttpClient) {
  }


  onFilesSelected(event: any): void {
    const files = event.target.files as File[];
    this.selectedFiles = [...this.selectedFiles, ...files];
  }

  onSubmit(): void {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();

      for (const file of this.selectedFiles) {
        formData.append('files', file);
      }

      this.http.post('http://localhost:8080/api/images/upload-multiple', formData)
        .subscribe(response => {
          console.log('Files uploaded successfully:', response);
        }, error => {
          console.error('Error uploading files:', error);
        });
    }
  }



  handleCheckboxChange(name: string) {
    this.selectedAmenityNames[name] = !this.selectedAmenityNames[name];
    console.log(this.selectedAmenityNames);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openSnackBar(message, action);
  }



  submitForm() {
    const price: Price = {
      cost: this.formGroupPrice.value.amount!,
      fromDate: this.formGroupPrice.value.priceStartDate,
      toDate: this.formGroupPrice.value.priceEndDate,
      type: (this.formGroupPrice.value.price_type === "PER_ACCOMMODATION") ? PriceType.PER_ACCOMMODATION : PriceType.PER_GUEST,
    };

    const address: Address = {
      street: this.formGroupLocation.value.street!,
      city: this.formGroupLocation.value.city!,
      latitude: this.formGroupLocation.value.lat!,
      longitude: this.formGroupLocation.value.lng!
    }

    const selectedAmenities: string[] = this.amenityNames.filter(
        amenity => this.selectedAmenityNames[amenity]
    );



    console.log('FormGroup Location:', this.formGroupLocation.value);
    console.log('Address', address.street, address.city, address.latitude, address.longitude)
    let accType = AccommodationType.STUDIO;
    if(this.formGroupNameDescType.value.accommodation_type === "Studio"){
      accType = AccommodationType.STUDIO;
    }else if(this.formGroupNameDescType.value.accommodation_type === "Room"){
      accType = AccommodationType.ROOM;
    } else if(this.formGroupNameDescType.value.accommodation_type === "Hotel") {
      accType = AccommodationType.HOTEL;
    } else if(this.formGroupNameDescType.value.accommodation_type === "Villa") {
      accType = AccommodationType.VILLA;
    }




    // const selectedImages: File[] = this.formGroupPhotos.get('photos')?.value;
    //
    // console.log(typeof(selectedImages));
    // this.photos = this.convertFilesToImages(selectedImages);

    const imageNames = this.selectedFiles.map(file => file.name);

    const accommodation: CreateAccommodation = {
      title: this.formGroupNameDescType.value.name!,
      description: this.formGroupNameDescType.value.description!,
      shortDescription: this.formGroupNameDescType.value.shortDescription!,
      type: accType,
      address: address,
      amenities: selectedAmenities,
      images: imageNames,
      startDate: this.formGroupAvailability.value.startDate!,
      endDate: this.formGroupAvailability.value.endDate!,
      price: price,
      min_capacity: this.formGroupMinMaxCapacity.value.min_capacity!,
      max_capacity: this.formGroupMinMaxCapacity.value.max_capacity!,
    };


    this.accommodationService.add(accommodation).subscribe(
        (response) => {
          console.log("Acccommodation created with photos: ", response);
          //this.uploadPhotos(response.id!);
          this.openSnackBar("Success!", "Close");

        },
        (error) => {
          console.error("Error creating accommodation with photos: ", error);
          this.openSnackBar("Error creating accommodation", "Close");
        }
    )


  }

  private uploadPhotos(accommodationId: number): void {
    this.selectedFiles.forEach((file) => {
      this.accommodationService.uploadFiles(accommodationId, file).subscribe(() => {
        console.log(`File ${file.name} uploaded successfully.`);
      });
    });
  }




  onMapClick(event: any) {
    // var location = event.latLng;
    // console.log(location);
    // this.formGroupLocation.value.lat = Number(localStorage.getItem("lat")!);
    // this.formGroupLocation.value.lng = Number(localStorage.getItem("lng")!);

  }

    detectFiles(event: any) {
        const files = event.target.files;
        console.log(files);
    }

    convertFileToImage(file: File): Image {
      const blob = new Blob([file], { type: file.type });
      return {
        path_mobile: URL.createObjectURL(blob),
        path_front: ''
      };
    }

    convertFilesToImages(fileList: File[]): Image[] {
        const images: Image[] = [];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (file) {
                const image = this.convertFileToImage(file);
                images.push(image);
            }
        }

        return images;
    }

  handleMapClick(eventData: { lat: number; lng: number; street: string; city: string }): void {
    this.formGroupLocation.value.street = eventData.street;
    this.formGroupLocation.value.city = eventData.city;
    this.formGroupLocation.value.lat = eventData.lat;
    this.formGroupLocation.value.lng = eventData.lng;

  }




  ngOnInit(): void {
    this.amenityService.getAllNames().subscribe(
        (names) => {
          this.amenityNames = names;

          this.amenityNames.forEach(name => this.selectedAmenityNames[name] = false);
        }
    )
  }




}



