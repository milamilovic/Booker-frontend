import {Component, Input, OnInit} from '@angular/core';
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
export class UserReportsComponent implements OnInit{
  @Input()
  user: User;

  reports: UserReport[] = [];

  reportsNumber = this.reports.length;


  constructor(private service: ReportedUsersManagementService,
              private userService: UserService) {
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
        next(data: Guest) :any {
          if (data.blocked) {
            let btn = document.getElementById('delete-btn');
            if (btn) {
              btn.textContent = "Unblock";
              btn.style.backgroundColor = "#e5e5e5";
              btn.style.color = "#3c3c3c";
            }
          }
        }
      })
    }
    if (this.user.role == UserType.OWNER) {
      this.userService.getOwnerById(this.user.id).subscribe({
        next(data: Owner): any {
          if (data.blocked) {
            let btn = document.getElementById('delete-btn');
            if (btn) {
              btn.textContent = "Unblock";
              btn.style.backgroundColor = "#e5e5e5";
              btn.style.color = "#3c3c3c";
            }
          }
        }
      })
    }
  }

  block(id: number) {

  }
}
