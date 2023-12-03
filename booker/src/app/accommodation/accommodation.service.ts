import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccommodationListingDto} from "./accommodation/model/accommodation.model";
import {environment} from "../../env/env";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private accListings: AccommodationListingDto[] = [];

  constructor(private http: HttpClient) { }

  searchAccommodations(startDate: string, endDate: string, location: string, people: number): Observable<AccommodationListingDto[]> {
    return this.http.get<AccommodationListingDto[]>(environment.apiHost + 'api/accommodations/' + 'search/' + startDate + '/' + endDate + '/' + location + '/' + people);
  }
}
