import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService, ConfigService} from "../service";
import {Router} from "@angular/router";
import {environment} from "../../env/env";
import {Observable} from "rxjs";
import {OwnerRatingDTO} from "./dto/OwnerRatingDTO";

@Injectable({
  providedIn: 'root'
})
export class OwnerRatingService {

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private configService: ConfigService,
              private router: Router) { }

  addRating(createOwnerRatingDTO: any) {
    return this.apiService.post(environment.apiHost + "api/owner_ratings/add_rating", createOwnerRatingDTO);
  }

  getAllForOwner(ownerId: number): Observable<OwnerRatingDTO[]> {
    return this.http.get<OwnerRatingDTO[]>(environment.apiHost + `api/owner_ratings/${ownerId}/ratings`);
  }
}
