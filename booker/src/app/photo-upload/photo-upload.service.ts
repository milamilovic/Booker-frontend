import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {CreateAccommodation} from "../accommodation/create-accommodation/model/create-accommodation.model";
import {AccommodationViewDto} from "../accommodation/accommodation/model/accommodation-view";

@Injectable({
  providedIn: 'root'
})
export class PhotoUploadService {

  baseApiUrl = environment.apiHost + "api/accommodations/add";

  constructor(private http: HttpClient) { }


}
