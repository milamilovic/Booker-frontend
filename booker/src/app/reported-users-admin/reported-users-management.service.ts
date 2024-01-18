import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserReport} from "../user/model/UserReport";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {User} from "../user/model/user.model";

@Injectable({
  providedIn: 'root'
})
export class ReportedUsersManagementService {

  constructor(private http: HttpClient) { }

  getAllReportsForUser(id: number) : Observable<UserReport[]> {
    return this.http.get<UserReport[]>(environment.apiHost + 'api/report_user/' + id);
  }

  getAllReportedUsers() : Observable<User[]> {
    return this.http.get<User[]>(environment.apiHost + 'api/admin/reported');
  }

  blockUser(id: number, blocked: boolean){
    return this.http.get<void>(environment.apiHost + 'api/report_user/' + id + '/block/' + blocked);
  }
}
