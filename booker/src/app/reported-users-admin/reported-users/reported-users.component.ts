import {Component, OnInit} from '@angular/core';
import {User} from "../../user/model/user.model";
import {ReportedUsersManagementService} from "../reported-users-management.service";

@Component({
  selector: 'app-reported-users',
  templateUrl: './reported-users.component.html',
  styleUrls: ['./reported-users.component.css']
})
export class ReportedUsersComponent implements OnInit{
  users: User[] = [];

  constructor(private service: ReportedUsersManagementService) {
  }

  ngOnInit(): void {
    this.service.getAllReportedUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        console.log(data);
        if (data.length != 0){
          let message = document.getElementById('message');
          if (message) {
            message.style.opacity = "0";
            message.style.marginTop = "0";
            message.style.padding = "0";
          }
        }
      },
      error: (_) => {
        console.log("error with users!");
      }
    })
  }
}
