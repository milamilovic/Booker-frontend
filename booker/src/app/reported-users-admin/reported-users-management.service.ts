import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserReport} from "../user/model/UserReport";
import {Observable} from "rxjs";
import {environment} from "../../env/env";

@Injectable({
  providedIn: 'root'
})
export class ReportedUsersManagementService {

  constructor(private http: HttpClient) { }

  getAllReportsForUser(id: number) : Observable<UserReport[]> {
    return this.http.get<UserReport[]>(environment.apiHost + 'api/report_user/' + id);
  }
}
