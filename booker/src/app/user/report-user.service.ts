import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ReportUserComponent} from "./report-user/report-user.component";
import {HttpClient} from "@angular/common/http";
import {ApiService, ConfigService} from "../service";
import {environment} from "../../env/env";
import {Owner} from "./owner-view/model/owner.model";

@Injectable({
  providedIn: 'root'
})
export class ReportUserService {

  constructor(private dialog: MatDialog,
              private http: HttpClient,
              private apiService: ApiService,
              private configService: ConfigService) { }

  openPopupForm(ownerId: number) {
    const dialogRef = this.dialog.open(ReportUserComponent, {
      data: { ownerId }, // Pass the owner data to the dialog
    });

    return dialogRef.afterClosed();
  }

  add(createUserReportDTO: any) {
    return this.apiService.post(environment.apiHost + "api/report_user/add_report", createUserReportDTO);
  }
}
