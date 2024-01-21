import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccommodationViewDto} from "../accommodation/model/accommodation-view";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {AmenityDTO} from "../../amenity/AmenityDTO";
import {AmenityService} from "../../amenity/amenity.service";
import {Image} from "../accommodation/model/Image";
import {UpdateAccommodationViewDTO} from "../dto/UpdateAccommodationViewDTO";
import {UpdateAddressDTO} from "../dto/UpdateAddressDTO";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {AccommodationCommentDTO} from "../accommodation/model/AccommodationCommentDTO";
import {AccommodationCommentService} from "../accommodation-comment.service";

@Component({
  selector: 'app-update-accommodation',
  templateUrl: './update-accommodation.component.html',
  styleUrls: ['./update-accommodation.component.css']
})
export class UpdateAccommodationComponent implements OnInit{
  selectedRating: number = 0;
  stars = Array(5).fill(0);
  hoverIndex: number = 0;
  averageRating: number = 0;
  accommodationComments: AccommodationCommentDTO[] = [];
  loggedIn: number = Number(localStorage.getItem('loggedId'));
  accommodationId: number = Number(localStorage.getItem('accommodationId'));
  accommodation!: AccommodationViewDto;
  updateAcc: UpdateAccommodationViewDTO = {
    _id: 0,
    manual_accepting: true
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
              private amenityService: AmenityService,
              private accommodationCommentService: AccommodationCommentService){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id']
      this.service.getAccommodation(this.id).subscribe({
        next: (data: AccommodationViewDto) => {
          this.accommodation = data;
          this.loadAccommodationComments();
          this.updateAcc = {
            _id: this.id,
            title: data.title,
            description: data.description,
            images: data.images,
            manual_accepting: data.manual_accepting
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
    localStorage.setItem("accommodationId", this.id.toString())
    this.router.navigate(['/update_availability']);
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
    if (isChecked) {
      if (!this.amenitiesForAcc.includes(amenity)) {
        this.amenitiesForAcc.push(amenity);
      }
    } else {
      const index = this.amenitiesForAcc.indexOf(amenity);
      if (index !== -1) {
        this.amenitiesForAcc.splice(index, 1);
      }
    }
  }

  cancel(){
    location.reload();
  }

  saveChanges(){
    this.service.saveUpdatedAcc(this.updateAcc).subscribe({next:(all:String)=>{location.reload();}});
    this.service.saveUpdatedAddr(this.id, this.updateAddress).subscribe({next:(all:String)=>{location.reload();}});
    this.amenitiesForAcc = [...this.amenitiesForAcc];
    this.service.saveUpdateAmenities(this.id, this.amenitiesForAcc).subscribe({next:(all:String)=>{location.reload();}});
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


  onToggle($event: MatSlideToggleChange) {
    // @ts-ignore
    console.log('toggle ', $event.checked)
    this.updateAcc.manual_accepting = $event.checked;
  }

  rate(rating: number): void {
    this.selectedRating = rating;
  }

  hover(index: number): void {
    this.hoverIndex = index;
  }

  reset(): void {
    this.hoverIndex = 0;
  }

  loadAccommodationComments(): void {
    this.accommodationCommentService.findAllNotDeletedForAccommodation(this.accommodationId).subscribe(
      (comments: AccommodationCommentDTO[]) => {
        console.log(comments);
        this.accommodationComments = comments;
        this.calculateAccommodationRate();
        console.log("Accommodation comments loaded successfully: ", comments);
      },
      (error) => {
        console.log("Error in loading accommodation comments: ", error);
      }
    )
  }

  reportComment(comment: AccommodationCommentDTO) {
    this.accommodationCommentService.report(comment.id).subscribe(
      (response) => {
        console.log("Comment: ", comment);
        console.log("Comment ID: ", comment.id);
        console.log("Accommodation comment successfully deleted!", response);
        this.loadAccommodationComments();
      },
      (error) => {
        console.log("Comment: ", comment);
        console.log("Comment ID: ", comment.id);
        console.log("Error in deleting accommodation comment!", error);
      }
    )
  }

  calculateAccommodationRate() {
    let totalRatings: number = 0;
    let numberOfComments: number = this.accommodationComments.length;
    for (const comment of this.accommodationComments) {
      totalRatings += comment.rating;
    }
    this.averageRating = totalRatings / numberOfComments;
  }
}
