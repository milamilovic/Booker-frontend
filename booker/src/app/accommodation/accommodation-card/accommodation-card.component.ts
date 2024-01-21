import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation-listing.model";
import {PriceType} from "../../enums/price-type.enum";
import {AccommodationService} from "../accommodation.service";
import {AccommodationRating} from "../accommodation/model/AccommodationRating";

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
  isFavourite: boolean = false;
  type: string = "";
  rating: string = "";
  onAccommodationClick(): void {
    this.clicked.emit(this.accommodation);
  }
  loggedRole: string | null = '';

  constructor(private service: AccommodationService) {
    this.accommodation = {
      id: undefined,
      title: '',
      description: '',
      totalPrice: 0,
      pricePerDay: 0,
      rating: 0,
      image: {
        path_front: '',
        path_mobile: '',
        accommodation: {}
      }
    }
  }

  ngOnInit(): void {
    this.loggedRole = localStorage.getItem("loggedRole");
    const loggedIn = localStorage.getItem("loggedId");
    this.service.checkFavourite(Number(loggedIn), this.accommodation.id).subscribe({
      next: (data: boolean) => {
        this.isFavourite = data;
        if(data) {
          this.favourite = "../../../assets/images/icons8-heart-30.png"
        } else {
          this.favourite = "../../../assets/images/icons8-heart-30 (1).png"
        }
      },
      error: (_) => {
        console.log("Greska!")
      }
    })
    this.service.getPriceType(this.accommodation.id).subscribe({
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
    this.service.getRatings(this.accommodation.id).subscribe({
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

  favouriteClick() {
    const loggedIn = localStorage.getItem("loggedId");
    if(this.isFavourite) {
      this.service.removeFavourite(Number(loggedIn), this.accommodation.id).subscribe({
        next: (data: boolean) => {
          this.favourite = '../../../assets/images/icons8-heart-30 (1).png';
          this.isFavourite = false;
        },
        error: (_) => {
          console.log("Greska!")
        }
      });
    } else {
      this.service.addFavourite(Number(loggedIn), this.accommodation.id).subscribe({
        next: (data: boolean) => {
          this.favourite = '../../../assets/images/icons8-heart-30.png';
          this.isFavourite = true;
        },
        error: (_) => {
          console.log("Greska!")
        }
      });
    }
  }
}
