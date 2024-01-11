import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ReportUserService} from "../report-user.service";
import {SnackBarComponent} from "../../shared/snack-bar/snack-bar.component";
import {CreateUserReportDTO} from "../dto/CreateUserReportDTO";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.css']
})
export class ReportUserComponent implements OnInit{
  report_user_form = new FormGroup({
    reason: new FormControl('')
  })

  constructor(private reportUserService: ReportUserService,
              private snackBar: SnackBarComponent,
              private dialogRef: MatDialogRef<ReportUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { ownerId: number }) {
  }
  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openSnackBar(message, action);
  }

  submitReport() {
    const userReport: CreateUserReportDTO = {
      reportedId: this.data.ownerId,
      reporterId: Number(localStorage.getItem('loggedId')),
      reason: this.report_user_form.value.reason!
    };

    this.reportUserService.add(userReport).subscribe(
      (response) => {
        console.log("User report successfully added!", response);
        this.openSnackBar("Sucess!", "Close");
      },
      (error) => {
        console.log("Error in reporting user!", error);
        this.openSnackBar("Error", "Close");
      }
    );

    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

}
