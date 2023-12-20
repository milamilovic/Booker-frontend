import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccommodationViewDto} from "../accommodation/model/accommodation-view";
import {AccommodationListingDto} from "../accommodation/model/accommodation-listing.model";
import {Owner} from "../../user/owner-view/model/owner.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../accommodation.service";

@Component({
  selector: 'app-update-accommodation',
  templateUrl: './update-accommodation.component.html',
  styleUrls: ['./update-accommodation.component.css']
})
export class UpdateAccommodationComponent implements OnInit{
  accommodation!: AccommodationViewDto;
  id: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: AccommodationService){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id']
      this.service.getAccommodation(this.id).subscribe({
        next: (data: AccommodationViewDto) => {
          this.accommodation = data;
        }
      })
    })
  }

  updatePriceAndAvailability(){
    // TODO set route for price & availability update component
    localStorage.setItem("accommodationId", this.id.toString())
    this.router.navigate(['/update_availability']);
  }

}
