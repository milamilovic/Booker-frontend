import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {User} from "../../user/model/user.model";
import {UserType} from "../../enums/user-type.enum";
import {object} from "@amcharts/amcharts5";
import {UserService} from "../../user/user.service";
import {UserReport} from "../../user/model/UserReport";
import {ReportedUsersManagementService} from "../reported-users-management.service";
import {Guest} from "../../user/guest-view/model/guest.model";
import {Owner} from "../../user/owner-view/model/owner.model";
import {ReservationService} from "../../reservations/reservation.service";
import {Reservation} from "../../reservations/model/Reservation";
import {of} from "rxjs";
import {Notification} from "../../notifications/model/Notification";
import {format} from "date-fns";
import {NotificationType} from "../../enums/notification-type";
import {NotificationService} from "../../notifications/notification.service";
import {AccommodationViewDto} from "../../accommodation/accommodation/model/accommodation-view";
import {AccommodationService} from "../../accommodation/accommodation.service";

@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.css']
})
export class UserReportsComponent implements OnInit {
  @Input()
  user: User;

  reports: UserReport[] = [];

  reportsNumber = this.reports.length;

  blocked: boolean = false;

  @ViewChild('deleteBtn') deleteBtn: ElementRef | undefined;



  constructor(private service: ReportedUsersManagementService,
              private userService: UserService,
              private renderer: Renderer2,
              private reservationService: ReservationService,
              private notificationService: NotificationService,
              private accommodationService: AccommodationService) {
    this.user = {
      "id": 0,
      "name": "",
      "surname": "",
      "email": "",
      "address": "",
      "phone": "",
      "password": "",
      "role": UserType.OWNER,
      "profilePicture": {
        "id":0,
        "path": "",
        "user": object
      }
    }
  }

  ngOnInit(): void {
    this.service.getAllReportsForUser(this.user.id).subscribe({
      next: (data: UserReport[]) => {
        this.reports = data;
        this.reportsNumber = data.length;

      }
    });
    if (this.user.role == UserType.GUEST){
      this.userService.getGuestById(this.user.id).subscribe({
        next: (data: Guest) => {
          this.blocked = data.blocked;
          if (data.blocked) {
            this.updateButtonStyle();
          }
        },

      })
    }
    if (this.user.role == UserType.OWNER) {
      this.userService.getOwnerById(this.user.id).subscribe({
        next: (data: Owner) => {
          this.blocked = data.blocked;
          if (data.blocked) {
            this.updateButtonStyle();
          }
        }
      })
    }
  }

  updateButtonStyle () {
    const buttonText = this.blocked ? 'Unblock' : 'Block';
    if (this.deleteBtn) {
      this.renderer.setProperty(this.deleteBtn.nativeElement, 'textContent', buttonText);
      this.renderer.setStyle(this.deleteBtn.nativeElement, 'backgroundColor', this.blocked ? '#e5e5e5' : '#3c3c3c');
      this.renderer.setStyle(this.deleteBtn.nativeElement, 'color', this.blocked ? '#3c3c3c' : '#e5e5e5');
    }
  }

  sendMessageUsingRest(acc: AccommodationViewDto) {
    let message: Notification = {
      userId: acc.owner_id,
      time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      content: "Reservation for accommodation " + acc.title + " got cancelled!",
      type: NotificationType.RESERVATION_CANCELLATION
    };

    this.notificationService.postRest(message).subscribe(res => {
      console.log(res);
    })
  }

  block(id: number) {
    this.service.blockUser(this.user.id, !this.blocked).subscribe({
      next: (data: void) => {
        if(this.blocked){
          alert("User " + this.user.name + " " + this.user.surname + " with id " + this.user.id + " is unblocked!");
        } else {
          alert("User " + this.user.name + " " + this.user.surname + " with id " + this.user.id + " is blocked!");
        }
        //location.reload();
        if (this.user.role == UserType.GUEST){
          this.userService.getGuestById(this.user.id).subscribe({
            next: (data: Guest) => {
              if (data.blocked) {
                console.log("blokirani gost");
                this.reservationService.getAllFutureApprovedForGuest(data.id).subscribe({
                  next: (result: Reservation[]) => {
                    console.log("lista rez");
                    if (result.length != 0) {
                      console.log(result);
                      // za svaku rezervaciju od odgovarajucih, poslati obavestenje domacinu smestaja o otkazivanju
                      result.forEach((r: Reservation) => {

                        this.accommodationService.getAccommodation(r.accommodationId).subscribe({
                          next: (acc: AccommodationViewDto)=>{
                            console.log("send mess");
                            this.sendMessageUsingRest(acc);
                          }
                        })
                      });
                    }
                  }
                })
              }
            }
          })
        }
      }
    })

    // ako je gost blokiran, treba mu otkazati sve rezervacije koje su odobrene


  }

}
