import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation-listing.model";
import {FavouriteAccommodation} from "../accommodation/model/favourite-accommodation";
import {AccommodationService} from "../accommodation.service";
import {PriceType} from "../../enums/price-type.enum";
import {AccommodationRating} from "../accommodation/model/AccommodationRating";

@Component({
  selector: 'app-favourite-card',
  templateUrl: './favourite-card.component.html',
  styleUrls: ['./favourite-card.component.css']
})
export class FavouriteCardComponent {
  @Input()
  accommodation: FavouriteAccommodation;
  @Output() refreshFavourites = new EventEmitter<string>();

  rating: string = "";

  constructor(private service: AccommodationService) {
    this.accommodation = {
      id: 0,
      title: '',
      shortDescription: '',
      avgPrice: 0,
      avgRating: 0,
      image: {
        path_front: '',
        path_mobile: '',
        accommodation: {}
      },
      address: {
        city: '',
        street: '',
        latitude: 0,
        longitude: 0
      }
    }
  }
  favourite: string = "";
  isFavourite: boolean = false;
  loggedRole: string | null = '';

  ngOnInit(): void {
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
    this.refreshFavourites.emit(' ');
  }
}
