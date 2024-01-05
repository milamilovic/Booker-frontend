import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AccommodationListingDto} from "../accommodation/accommodation/model/accommodation-listing.model";
import {environment} from "../../env/env";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiService, ConfigService} from "../service";
import {ReservationRequest} from "../accommodation/accommodation/model/ReservationRequest";
import {Filter} from "../accommodation/accommodation/model/Filter";

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

  searchRequests(searchDate: string, accName: string, guestId: number): Observable<ReservationRequest[]> {
    return this.http.get<ReservationRequest[]>(environment.apiHost + 'api/requests/guest/' + guestId + '/search/' + searchDate + '/' + accName);
  }

  searchAndFilterRequests(searchDate: string, accName: string, guestId: number, filters: Filter[]): Observable<ReservationRequest[]> {
    const requestBody = JSON.stringify(filters);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<ReservationRequest[]>(environment.apiHost + 'api/requests/guest/' + guestId + '/search/' + searchDate + '/' + accName + '/filter',
      requestBody,
      {headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4200'}});
  }

  filterRequests(guestId: number, filters: Filter[]): Observable<ReservationRequest[]> {
    const requestBody = JSON.stringify(filters);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<ReservationRequest[]>(environment.apiHost + 'api/requests/guest/' + guestId + '/filter',
      requestBody,
      {headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4200'}});
  }

  getAllForOwner(ownerId: number) {
    return this.http.get<ReservationRequest[]>(environment.apiHost + 'api/requests/owner/' + ownerId);
  }

  searchOwnerRequests(searchDate: string, accName: string, ownerId: number): Observable<ReservationRequest[]> {
    return this.http.get<ReservationRequest[]>(environment.apiHost + 'api/requests/owner/' + ownerId + '/search/' + searchDate + '/' + accName);
  }

  searchAndFilterOwnerRequests(searchDate: string, accName: string, ownerId: number, filters: Filter[]): Observable<ReservationRequest[]> {
    const requestBody = JSON.stringify(filters);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<ReservationRequest[]>(environment.apiHost + 'api/requests/owner/' + ownerId + '/search/' + searchDate + '/' + accName + '/filter',
      requestBody,
      {headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4200'}});
  }

  filterOwnerRequests(ownerId: number, filters: Filter[]): Observable<ReservationRequest[]> {
    const requestBody = JSON.stringify(filters);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<ReservationRequest[]>(environment.apiHost + 'api/requests/owner/' + ownerId + '/filter',
      requestBody,
      {headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4200'}});
  }
}
