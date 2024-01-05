import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AccommodationListingDto} from "../accommodation/accommodation/model/accommodation-listing.model";
import {environment} from "../../env/env";
import {HttpClient} from "@angular/common/http";
import {ApiService, ConfigService} from "../service";
import {ReservationRequest} from "../accommodation/accommodation/model/ReservationRequest";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private configService: ConfigService) { }

  getAllForGuest(guestId: number) : Observable<ReservationRequest[]>{
    return this.http.get<ReservationRequest[]>(environment.apiHost + 'api/requests/guest/' + guestId);
  }
}
