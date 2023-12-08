import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation-listing.model";

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent implements OnInit{
  @Input()
  accommodation: AccommodationListingDto;

  @Output()
  clicked: EventEmitter<AccommodationListingDto> = new EventEmitter<AccommodationListingDto>();

  favourite: string = "";
  onAccommodationClick(): void {
    this.clicked.emit(this.accommodation);
  }

  constructor() {
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
  }
}
