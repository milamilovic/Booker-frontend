import {Component, Input} from '@angular/core';
import {ReservationRequest} from "../../accommodation/accommodation/model/ReservationRequest";
import {AccommodationViewDto} from "../../accommodation/accommodation/model/accommodation-view";
import {RequestService} from "../request.service";
import {Guest} from "../../user/guest-view/model/guest.model";
import {UserType} from "../../enums/user-type.enum";
import {AccommodationRating} from "../../accommodation/accommodation/model/AccommodationRating";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-owner-card',
  templateUrl: './owner-card.component.html',
  styleUrls: ['./owner-card.component.css']
})
export class OwnerCardComponent {
  @Input()
  request: ReservationRequest;

  // @ts-ignore
  accommodation: AccommodationViewDto;

  // @ts-ignore
  guest: Guest;

  cancelled: number = 0;

  constructor(private service: RequestService,
              private accommodationService: AccommodationService,
              private userService: UserService) {
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
    this.userService.getGuestById(this.request.guestId).subscribe({
      next: (data: Guest) => {
        this.guest = data
      },
      error: (_) => {
        console.log("Greska!")
      }
    })
    this.userService.getCancelled(this.request.guestId).subscribe({
      next: (data: number) => {
        this.cancelled = data
      },
      error: (_) => {
        console.log("Greska!")
      }
    })
  }
}
