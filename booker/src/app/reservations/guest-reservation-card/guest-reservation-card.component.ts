import {Component, Input, OnInit} from '@angular/core';
import {AccommodationViewDto} from "../../accommodation/accommodation/model/accommodation-view";
import {Reservation} from "../model/Reservation";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {ReservationService} from "../reservation.service";
import {AccommodationRating} from "../../accommodation/accommodation/model/AccommodationRating";
import {Router} from "@angular/router";
import {format} from 'date-fns';
import {ReservationStatus} from "../../enums/reservation-status-enum";

@Component({
  selector: 'app-guest-reservation-card',
  templateUrl: './guest-reservation-card.component.html',
  styleUrls: ['./guest-reservation-card.component.css']
})
export class GuestReservationCardComponent implements OnInit{
  @Input()
  reservation: Reservation;
  // @ts-ignore
  accommodation: AccommodationViewDto;
  rating: string = "";
  deadlineDays: number = 0;
  deadline: string = "";

  constructor(private router: Router,
              private service: ReservationService,
              private accommodationService: AccommodationService) {
    console.log("dunja");
    this.reservation = {
      "guestId": NaN,
      "accommodationId": 0,
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
    const accommodationId = this.reservation.accommodationId;
    if (accommodationId !== undefined) {
      this.accommodationService.getAccommodation(accommodationId).subscribe({
        next: (data: AccommodationViewDto) => {
          console.log(data);
          this.accommodation = data;
          this.deadlineDays = this.accommodation.deadline;
          let deadlineDate = new Date(this.reservation.fromDate);
          this.deadline = format(new Date(deadlineDate.getTime() - (this.deadlineDays * 24 * 60 * 60 * 1000)), "dd.MM.yyyy.");
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
    }
  }

  cancelReservation(): void{
    if(new Date(this.reservation.fromDate) < new Date()) {
      alert("this request has a past date so you can't cancel it")
    }
    else {
      this.service.cancelReservation(this.reservation.id).subscribe({
        next: (response: boolean) => {
          if (response) {
            alert("Reservation is cancelled!");
          } else {
            alert("You can not cancel reservation because deadline for cancellation expired." +
              "\nUnfortunately you must pay for it.");
          }
          location.reload();
        },
        error: (_) => {
          console.log("Greska!")
        }
      })
    }
  }

  openAccommodation():void{
      this.router.navigate(['accommodation', this.accommodation.id]);
  }
}
