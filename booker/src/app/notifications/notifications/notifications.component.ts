import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../notification.service";
import {Notification} from "../model/Notification";
import {Owner} from "../../user/owner-view/model/owner.model";
import {Guest} from "../../user/guest-view/model/guest.model";
import {UserService} from "../../user/user.service";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{
  notifications : Notification[] = [];
  owner!:Owner;
  guest!:Guest;
  // @ts-ignore
  loginRole: string = localStorage.getItem("loggedRole");

  constructor(private service:NotificationService,
              private userService:UserService) {
  }

  ngOnInit(): void {
    let loggedId = Number(localStorage.getItem('loggedId'));
    this.service.getAllPersonalNotifications(loggedId).subscribe({
      next: (data:Notification[]) => {
        this.notifications = data;
      },
      error:(_)=>{
        console.log("Error with notifications");
      }
    })
    if (this.loginRole == 'guests'){
      this.userService.getGuestById(loggedId).subscribe({
        next:(data:Guest)=>{
          this.guest = data;
        },
        error:(_)=>{
          console.log("Error with guest");
        }
      })
    } else{
      this.userService.getOwnerById(loggedId).subscribe({
        next:(data:Owner)=>{
          this.owner = data;
        },
        error:(_)=>{
          console.log("Error with owner");
        }
      })
    }

  }


  onToggle($event: MatSlideToggleChange) {
    //TODO saljemo zahtev za promenu podesavanja notif
  }
}
