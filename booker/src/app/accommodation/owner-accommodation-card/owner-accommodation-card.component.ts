import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation-listing.model";
import {AccommodationService} from "../accommodation.service";
import {PriceType} from "../../enums/price-type.enum";
import {AccommodationRating} from "../accommodation/model/AccommodationRating";

@Component({
  selector: 'app-owner-accommodation-card',
  templateUrl: './owner-accommodation-card.component.html',
  styleUrls: ['./owner-accommodation-card.component.css']
})
export class OwnerAccommodationCardComponent implements OnInit{
  @Input()
  accommodation: AccommodationListingDto;

  @Output()
  clicked: EventEmitter<AccommodationListingDto> = new EventEmitter<AccommodationListingDto>();

  favourite: string = "";
  type: string = "";
  rating: string = "";
  onAccommodationClick(): void {
    this.clicked.emit(this.accommodation);
  }

  constructor(private service: AccommodationService) {
    this.accommodation = {
      id: undefined,
      title: '',
      description: '',
      totalPrice: 0,
      pricePerDay: 0,
      rating: 0,
      image: {
        path: '',
        accommodation: {}
      }
    }
  }

  ngOnInit(): void {
    //TODO: add checking if acc is favourite for user
    let isFavourite = Math.round(Math.random()) == 1;
    if(isFavourite) {
      this.favourite = "../../../assets/images/icons8-heart-30.png"
    } else {
      this.favourite = "../../../assets/images/icons8-heart-30 (1).png"
    }
    PriceType
    let priceType = this.service.getPriceType(this.accommodation.id).subscribe({
      next: (data: PriceType) => {
        if(data == PriceType.PER_ACCOMMODATION) {
          this.type = "day";
        } else {
          this.type = "person per day";
        }
      },
      error: (_) => {
        console.log("Greska!")
      }
    })
    //TODO: enter average rating
    let ratings = this.service.getRatings(this.accommodation.id).subscribe({
      next: (data: AccommodationRating[]) => {
        let sum = 0;
        for(let index in data ) {
          sum += data[index].rate;
        }
        let ratingNum = sum / data.length;
        if(isNaN(ratingNum)) {
          this.rating = "No ratings yet     "
        } else {
          this.rating = '                 ' + ratingNum.toString() + ' / 5.0';
        }
      },
      error: (_) => {
        console.log("Greska!")
      }
    })
  }
}
