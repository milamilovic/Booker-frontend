import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {AmenityDTO} from "./AmenityDTO";
import {Amenity} from "../accommodation/accommodation/model/Amenity";

@Injectable({
  providedIn: 'root'
})
export class AmenityService {

  constructor(private http: HttpClient) { }

  getAllNames() {
    return this.http.get<string[]>(environment.apiHost + "api/amenities/names");
  }


}
