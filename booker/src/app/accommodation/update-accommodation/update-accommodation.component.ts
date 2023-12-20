import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccommodationViewDto} from "../accommodation/model/accommodation-view";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {AmenityDTO} from "../../amenity/AmenityDTO";
import {AmenityService} from "../../amenity/amenity.service";
import {Image} from "../accommodation/model/Image";
import {UpdateAccommodationViewDTO} from "../dto/UpdateAccommodationViewDTO";
import {UpdateAddressDTO} from "../dto/UpdateAddressDTO";

@Component({
  selector: 'app-update-accommodation',
  templateUrl: './update-accommodation.component.html',
  styleUrls: ['./update-accommodation.component.css']
})
export class UpdateAccommodationComponent implements OnInit{
  accommodation!: AccommodationViewDto;
  updateAcc: UpdateAccommodationViewDTO = {
    _id: 0
  };
  updateAddress: UpdateAddressDTO = {
    _id: 0
  }
  allAmenities: AmenityDTO[] = [];
  amenitiesForAcc:AmenityDTO[] = [];
  id: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: AccommodationService,
              private amenityService: AmenityService){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id']
      this.service.getAccommodation(this.id).subscribe({
        next: (data: AccommodationViewDto) => {
          this.accommodation = data;
          this.updateAcc = {
            _id: this.id,
            title: data.title,
            description: data.description,
            images: data.images
          }
          this.updateAddress = {
            _id: 0,
            city: data.address.city,
            street: data.address.street,
            longitude: data.address.longitude,
            latitude: data.address.latitude
          }
        }
      });
      this.amenityService.getAll().subscribe({
        next: (all: AmenityDTO[]) => {
          this.allAmenities = all;
        }
      });
      this.amenityService.getAllForAccommodation(this.id).subscribe({
        next:(all: AmenityDTO[]) => {
          this.amenitiesForAcc = all;
        }
      })
    })
  }

  updatePriceAndAvailability(){
    // TODO set route for price & availability update component
    this.router.navigate(['']);
  }

  autoSize(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
  }

  isAvailable(amenity:AmenityDTO): boolean{
    return this.amenitiesForAcc.some(item => item.name === amenity.name);
  }

  toggleAmenity(event: any, amenity: any) {
    const isChecked = event.target.checked;

  }

  cancel(){
    location.reload();
  }

  saveChanges(){
    this.service.saveUpdatedAcc(this.updateAcc).subscribe({next:(all:String)=>{location.reload();}});
    this.service.saveUpdatedAddr(this.id, this.updateAddress).subscribe({next:(all:String)=>{location.reload();}});
  }

  deleteImage(image : Image){
    console.log(image.id);
    this.service.removeImage(this.id, image).subscribe({next:(all:void)=>{location.reload();}});

  }

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files.length === 0) {
      return;
    }

    console.log(files);

    this.service.uploadFile(this.id, files).subscribe(
      (response:any) => {
        console.log('Files uploaded successfully', response);
        location.reload();
      },
      (error) => {
        location.reload();
      }
    );
  }



}
