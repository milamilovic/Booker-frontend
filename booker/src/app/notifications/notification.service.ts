import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {Notification} from "./model/Notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getAllPersonalNotifications(id:number):Observable<Notification[]> {
    return this.http.get<Notification[]>(environment.apiHost + 'api/notifications/' + id);
  }
}
