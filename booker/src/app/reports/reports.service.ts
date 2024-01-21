import { Injectable } from '@angular/core';
import {environment} from "../../env/env";
import {HttpClient} from "@angular/common/http";
import {ReportDataUnit} from "./model/ReportDataUnit";
import {AccommodationName} from "./model/AccommodationName";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getAccommodationReport(year: number, ownerId: number, accId: number) {
    return this.http.get<ReportDataUnit[]>(environment.apiHost + 'api/report/owner/' + ownerId + '/accommodation/' + year + '/' + accId);
  }

  getIntervalReport(from: string, ownerId: number, to: string) {
    return this.http.get<ReportDataUnit[]>(environment.apiHost + 'api/report/owner/' + ownerId + '/interval/' + from + '/' + to);
  }

  getAccommodationNames(ownerId: number) {
    return this.http.get<AccommodationName[]>(environment.apiHost + 'api/accommodations/owner/' + ownerId + '/accommodationNames');
  }

  getAccommodationId(name: String) {
    return this.http.get<number>(environment.apiHost + 'api/accommodations/name/' + name);
  }
}
