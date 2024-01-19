import {Component, Input, OnInit} from '@angular/core';
import {UserReport} from "../../user/model/UserReport";
import {User} from "../../user/model/user.model";
import {UserService} from "../../user/user.service";
import {format} from "date-fns";

@Component({
  selector: 'app-reporting-card',
  templateUrl: './reporting-card.component.html',
  styleUrls: ['./reporting-card.component.css']
})
export class ReportingCardComponent implements OnInit{
  @Input()
  report: UserReport;
  name: string = "";
  reporter!: User;
  date: string = "";

  constructor(private userService: UserService) {
    this.report = {
      "id": 0,
      "reportedId": 0,
      "reporterId": 0,
      "reason": "",
      "date": new Date()
    }
  }
  ngOnInit(): void {
    this.userService.findById(this.report.reporterId).subscribe({
      next: (data: User) => {
        this.reporter = data;
        this.name = this.reporter.name + " " + this.reporter.surname;
        this.date = format(this.report.date, "yyyy-MM-dd");
      }
    })
  }

}
