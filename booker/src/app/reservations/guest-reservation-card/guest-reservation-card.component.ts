import {Component, Input, OnInit} from '@angular/core';
import {AccommodationViewDto} from "../../accommodation/accommodation/model/accommodation-view";
import {Reservation} from "../model/Reservation";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {ReservationService} from "../reservation.service";
import {AccommodationRating} from "../../accommodation/accommodation/model/AccommodationRating";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-guest-reservation-card',
  templateUrl: './guest-reservation-card.component.html',
  styleUrls: ['./guest-reservation-card.component.css']
})
export class GuestReservationCardComponent implements OnInit{
  reservation!: Reservation;
  accommodation!: AccommodationViewDto;
  rating: string = "";
  deadline: string = "";

  constructor(private router: Router,
              private service: ReservationService,
              private accommodationService: AccommodationService) {
    this.reservation = {
      "guestId": NaN,
      "accommodation": undefined,
      "id": 0,
      "fromDate": "2024-03-01",
      "toDate": "2024-03-10",
      "numberOfGuests": 0,
      "requestStatus": 0,
      "status": 0,
      "deleted": false,
      "price": 0.0
    }
  }

  ngOnInit() {
    const accommodationId = this.reservation.accommodation?.id;
    if (accommodationId !== undefined) {
      this.accommodationService.getAccommodation(accommodationId).subscribe({
        next: (data: AccommodationViewDto) => {
          this.accommodation = data;
        },
        error: (_) => {
          console.log("Greska!")
        }
      });
      let ratings = this.accommodationService.getRatings(accommodationId).subscribe({
        next: (data: AccommodationRating[]) => {
          let sum = 0;
          for (let index in data) {
            sum += data[index].rate;
          }
          let ratingNum = sum / data.length;
          if (isNaN(ratingNum)) {
            this.rating = "No ratings yet     "
          } else {
            this.rating = '                 ' + ratingNum.toString() + ' / 5.0';
          }
        },
        error: (_) => {
          console.log("Greska!")
        }
      })
      let deadlineDate = new Date(this.reservation.toDate);
      this.deadline = new Date(deadlineDate.getTime() - (15 * 24 * 60 * 60 * 1000)).toString();
    }
  }

  cancelReservation(): void{

  }

  openAccommodation():void{
    this.router.navigate(['accommodation', this.accommodation.id]);
  }
}
