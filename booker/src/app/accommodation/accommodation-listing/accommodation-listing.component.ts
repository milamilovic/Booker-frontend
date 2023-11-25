import { Component } from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation.model";

@Component({
  selector: 'app-accommodation-listing',
  templateUrl: './accommodation-listing.component.html',
  styleUrls: ['./accommodation-listing.component.css']
})
export class AccommodationListingComponent {
  accommodations: AccommodationListingDto[] = [
    {
      "id": 1,
      "name": "Cozy Cottage",
      "shortDescription": "A charming cottage in the countryside",
      "totalPrice": 150,
      "pricePerDay": 50,
      "rating": 4.5
    },
    {
      "id": 2,
      "name": "City View Apartment",
      "shortDescription": "Modern apartment with a stunning city view",
      "totalPrice": 200,
      "pricePerDay": 60,
      "rating": 4.8
    },
    {
      "id": 3,
      "name": "Beachfront Villa",
      "shortDescription": "Luxurious villa with direct access to the beach",
      "totalPrice": 500,
      "pricePerDay": 100,
      "rating": 5.0
    }
  ];
  clickedAcc: string = ''


}
