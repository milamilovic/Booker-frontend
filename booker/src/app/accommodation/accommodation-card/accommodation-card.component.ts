import {Component, Input} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation.model";

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {
  @Input()
  accommodation: AccommodationListingDto;

  constructor() {
    this.accommodation = {
      id: undefined,
      name: '',
      shortDescription: '',
      totalPrice: 0,
      pricePerDay: 0,
      rating: 0,
    }
  }
}
