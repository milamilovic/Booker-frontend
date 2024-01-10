import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {Reservation} from "./model/Reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getAllForGuest(guestId: number) : Observable<Reservation[]>{
    return this.http.get<Reservation[]>(environment.apiHost + 'api/reservations/guest/' + guestId);
  }
}
