import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../env/env";
import {Notification} from "./model/Notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url: string = environment.apiHost + "api/socket";
  restUrl:string = environment.apiHost + "sendMessageRest";

  constructor(private http: HttpClient) { }

  post(data: Notification) {
    return this.http.post<Notification>(this.url, data)
      .pipe(map((data: Notification) => { return data; }));
  }

  postRest(data: Notification) {
    return this.http.post<Notification>(this.restUrl, data)
      .pipe(map((data: Notification) => { return data; }));
  }

  getAllPersonalNotifications(id:number):Observable<Notification[]> {
    return this.http.get<Notification[]>(environment.apiHost + 'api/notifications/' + id);
  }

  changePreferences(id: number, checked: boolean, userId: number){
    return this.http.get<void>(environment.apiHost + 'api/notifications/settings/' + userId + '/' + id + '/' + checked);
  }
}
