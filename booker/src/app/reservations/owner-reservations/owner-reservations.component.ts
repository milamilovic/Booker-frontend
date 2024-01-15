import { Component } from '@angular/core';
import {Reservation} from "../model/Reservation";
import {ReservationService} from "../reservation.service";
import {Router} from "@angular/router";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {AccommodationListingDto} from "../../accommodation/accommodation/model/accommodation-listing.model";

@Component({
  selector: 'app-owner-reservations',
  templateUrl: './owner-reservations.component.html',
  styleUrls: ['./owner-reservations.component.css']
})
export class OwnerReservationsComponent {
  reservations: Reservation[] = [];
  accommodations: AccommodationListingDto[] = [];

  constructor(private service: ReservationService,
              private accommodationService : AccommodationService,
              private router: Router) {
  }

  ngOnInit(): void {
    const loggedId = Number(localStorage.getItem("loggedId"));
    this.accommodationService.getAllForOwner(loggedId).subscribe({
      next: (data: AccommodationListingDto[]) => {
        this.accommodations = data;
        console.log(this.accommodations);
        this.accommodations.forEach(el => {
          if (el.id){
            console.log(el);
            this.service.getAllForAccommodation(el.id).subscribe({
              next: (result: Reservation[]) => {
                console.log(result);
                this.reservations = this.reservations.concat(result);
                console.log(this.reservations);
              },
              error: (_) => {
                console.log("Error with reservations!")
              }
            })
          }
        })
      },
      error: (_) => {
        console.log("Error with owner's accommodations!")
      }
    })
  }
}
