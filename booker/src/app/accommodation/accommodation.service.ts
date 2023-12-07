import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccommodationListingDto} from "./accommodation/model/accommodation-listing.model";
import {environment} from "../../env/env";
import {AccommodationViewDto} from "./accommodation/model/accommodation-view";
import {CreateAccommodation} from "./create-accommodation/model/create-accommodation.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private accListings: AccommodationListingDto[] = [];

  constructor(private http: HttpClient) { }

  searchAccommodations(startDate: string, endDate: string, location: string, people: number): Observable<AccommodationListingDto[]> {
    return this.http.get<AccommodationListingDto[]>(environment.apiHost + 'api/accommodations/' + 'search/' + startDate + '/' + endDate + '/' + location + '/' + people);
  }

  getAccommodation(id: number): Observable<AccommodationViewDto> {
    return this.http.get<AccommodationViewDto>(environment.apiHost + 'api/accommodations/' + id)
  }

  add(createAccommodation: CreateAccommodation): Observable<CreateAccommodation> {
    return this.http.post<CreateAccommodation>(environment.apiHost + 'api/accommodations/add', createAccommodation)
  }
}
