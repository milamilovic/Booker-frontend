import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation.model";

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {
  @Input()
  accommodation: AccommodationListingDto;

  @Output()
  clicked: EventEmitter<AccommodationListingDto> = new EventEmitter<AccommodationListingDto>();

  onAccommodationClick(): void {
    this.clicked.emit(this.accommodation);
  }

  constructor() {
    this.accommodation = {
      id: undefined,
      name: '',
      shortDescription: '',
      totalPrice: 0,
      pricePerDay: 0,
      rating: 0,
      image: ''
    }
  }
}
