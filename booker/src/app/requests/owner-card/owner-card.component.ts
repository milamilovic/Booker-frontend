import {Component, Input} from '@angular/core';
import {ReservationRequest} from "../../accommodation/accommodation/model/ReservationRequest";
import {AccommodationViewDto} from "../../accommodation/accommodation/model/accommodation-view";
import {RequestService} from "../request.service";
import {Guest} from "../../user/guest-view/model/guest.model";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {UserService} from "../../user/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Notification} from "../../notifications/model/Notification";
import {format} from "date-fns";
import {NotificationType} from "../../enums/notification-type";
import {NotificationService} from "../../notifications/notification.service";
import {ReservationRequestStatus} from "../../enums/reservation-request-status.enum";

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
              private userService: UserService,
              private notificationService: NotificationService) {
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

  sendMessageUsingRest() {
    let message: Notification = {
      userId: this.request.guestId,
      time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      content: "You got an answer for reservation request\n for accommodation " + this.accommodation.title,
      type: NotificationType.RESERVATION_APPROVE
    };

    this.notificationService.postRest(message).subscribe(res => {
      console.log(res);
    })
  }

  approveRequest() {
    if(new Date(this.request.fromDate) < new Date()) {
      alert("this request has a past date so you can't approve it")
    } else {
      this.service.acceptOrDeclineReservationRequest(this.request, true).subscribe({
        next: (data: string) => {
          console.log(data);
          if (data === "OK"){
            alert("reservation request is approved!\nreservation created!")
            this.sendMessageUsingRest();
          }
          else {
            alert(data);
            this.sendMessageUsingRest();
          }
          this.request.status = ReservationRequestStatus.ACCEPTED;
        },
        error: (error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            alert('Error occurred:' + error.error.message);
          } else {
            alert(error.error.text);
            this.sendMessageUsingRest();
          }
          this.request.status = ReservationRequestStatus.ACCEPTED;
          console.log("Greška:", error);
        }
      });
    }
  }

  denyRequest() {
    if(new Date(this.request.fromDate) < new Date()) {
      alert("this request has a past date so you can't deny it")
    } else {
      this.service.acceptOrDeclineReservationRequest(this.request, false).subscribe({
        next: (data: String) => {
          if (data === "OK"){
            alert("reservation request is denied!");
            this.sendMessageUsingRest();
          }
          else {
            alert(data);
            this.sendMessageUsingRest();
          }
          this.request.status = ReservationRequestStatus.DENIED;
        },
        error: (_) => {
          console.log("Greska!")
        }
      });
    }
  }
}
