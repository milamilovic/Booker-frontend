import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {User} from "../../user/model/user.model";
import {UserType} from "../../enums/user-type.enum";
import {object} from "@amcharts/amcharts5";
import {UserService} from "../../user/user.service";
import {UserReport} from "../../user/model/UserReport";
import {ReportedUsersManagementService} from "../reported-users-management.service";
import {Guest} from "../../user/guest-view/model/guest.model";
import {Owner} from "../../user/owner-view/model/owner.model";

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
              private renderer: Renderer2) {
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

  block(id: number) {
    this.service.blockUser(this.user.id, !this.blocked).subscribe({
      next: (data: void) => {
        if(this.blocked){
          alert("User " + this.user.name + " " + this.user.surname + " with id " + this.user.id + " is unblocked!");
        } else {
          alert("User " + this.user.name + " " + this.user.surname + " with id " + this.user.id + " is blocked!");
        }
        location.reload();
      }
    })

  }

}
