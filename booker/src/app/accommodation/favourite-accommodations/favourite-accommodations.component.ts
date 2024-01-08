import {Component, ElementRef} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation-listing.model";
import {AccommodationService} from "../accommodation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {FavouriteAccommodation} from "../accommodation/model/favourite-accommodation";

@Component({
  selector: 'app-favourite-accommodations',
  templateUrl: './favourite-accommodations.component.html',
  styleUrls: ['./favourite-accommodations.component.css']
})
export class FavouriteAccommodationsComponent {
  accommodations: FavouriteAccommodation[] = [
    {
      id: 123,
      title: 'Luxurious Beachfront Villa',
      shortDescription: 'Experience luxury and comfort by the sea.',
      avgPrice: 350.50,
      avgRating: 4.8,
      image: {
        path_front: '../../assets/images/living-room.jpg',
        path_mobile: 'images/mobile_view.jpg',
        accommodation: {}
      },
      address: {
        city: 'Paradise City',
        street: 'Oceanfront Avenue',
        latitude: 34.0522,
        longitude: -118.2437
      }
    },
    {
      id: 123,
      title: 'Luxurious Beachfront Villa',
      shortDescription: 'Experience luxury and comfort by the sea.',
      avgPrice: 350.50,
      avgRating: 4.8,
      image: {
        path_front: '../../assets/images/kitchen-2165756_640.jpg',
        path_mobile: 'images/mobile_view.jpg',
        accommodation: {}
      },
      address: {
        city: 'Paradise City',
        street: 'Oceanfront Avenue',
        latitude: 34.0522,
        longitude: -118.2437
      }
    },
    {
      id: 123,
      title: 'Luxurious Beachfront Villa',
      shortDescription: 'Experience luxury and comfort by the sea.',
      avgPrice: 350.50,
      avgRating: 4.8,
      image: {
        path_front: '../../assets/images/living-room.jpg',
        path_mobile: 'images/mobile_view.jpg',
        accommodation: {}
      },
      address: {
        city: 'Paradise City',
        street: 'Oceanfront Avenue',
        latitude: 34.0522,
        longitude: -118.2437
      }
    }
  ];

  constructor(private service: AccommodationService) {
  }

  ngOnInit(): void {

  }
}
