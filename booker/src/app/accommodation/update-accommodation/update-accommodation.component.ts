import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccommodationViewDto} from "../accommodation/model/accommodation-view";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {AmenityDTO} from "../../amenity/AmenityDTO";
import {AmenityService} from "../../amenity/amenity.service";

@Component({
  selector: 'app-update-accommodation',
  templateUrl: './update-accommodation.component.html',
  styleUrls: ['./update-accommodation.component.css']
})
export class UpdateAccommodationComponent implements OnInit{
  accommodation!: AccommodationViewDto;
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

  }


}
