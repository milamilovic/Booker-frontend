import {Component, Input} from '@angular/core';
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
  }
}
