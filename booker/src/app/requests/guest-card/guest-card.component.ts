import {Component, Input, OnInit} from '@angular/core';
import {ReservationRequest} from "../../accommodation/accommodation/model/ReservationRequest";
import {RequestService} from "../request.service";
import {AccommodationViewDto} from "../../accommodation/accommodation/model/accommodation-view";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {AccommodationRating} from "../../accommodation/accommodation/model/AccommodationRating";
import {ReservationRequestStatus} from "../../enums/reservation-request-status.enum";

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-card.component.html',
  styleUrls: ['./guest-card.component.css']
})
export class GuestCardComponent implements OnInit{
  @Input()
  request: ReservationRequest;

  // @ts-ignore
  accommodation: AccommodationViewDto;
  rating: string = "";

  constructor(private service: RequestService, private accommodationService: AccommodationService) {
    this.request = {
      "guestId": NaN,
      "accommodationId": 0,
      "id": 0,
      "fromDate": "2024-03-01",
      "toDate": "2024-03-10",
      "numberOfGuests": 0,
      "status": 0,
      "deleted": false,
      "price": 0.0
    }

  }

  ngOnInit(): void {
    this.accommodationService.getAccommodation(this.request.accommodationId).subscribe({
      next: (data: AccommodationViewDto) => {
        this.accommodation = data;
      },
      error: (_) => {
        console.log("Greska!")
      }
    });
    let ratings = this.accommodationService.getRatings(this.request.accommodationId).subscribe({
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

  cancelRequest() {
    if(new Date(this.request.fromDate) < new Date()) {
      alert("this request has a past date so you can't cancel it")
    } else {
      this.service.cancelRequest(this.request).subscribe({
        next: (data: null) => {
          alert("reservation is cancelled!")
          //location.reload();
          this.request.status = ReservationRequestStatus.DENIED;
        },
        error: (_) => {
          console.log("Greska!")
        }
      });
    }
  }
}
