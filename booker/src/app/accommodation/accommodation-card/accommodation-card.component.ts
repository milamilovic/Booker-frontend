import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation-listing.model";
import {PriceType} from "../../enums/price-type.enum";
import {AccommodationService} from "../accommodation.service";

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
  type: string = "";
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
    //TODO set type of price ("day" or "person per day")
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
  }
}
