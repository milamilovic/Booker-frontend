import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService, ConfigService} from "../service";
import {Router} from "@angular/router";
import {environment} from "../../env/env";
import {AccommodationCommentDTO} from "./accommodation/model/AccommodationCommentDTO";

@Injectable({
  providedIn: 'root'
})
export class AccommodationCommentService {

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private configService: ConfigService,
              private router: Router) { }

  add(createOwnerCommentDTO: any) {
    return this.apiService.post(environment.apiHost + "api/accommodation_comments/add_comment", createOwnerCommentDTO);
  }

  findAllNotDeletedForAccommodation(accommodationId: number) {
    console.log(accommodationId);
    console.log(environment.apiHost + `api/accommodation_comments/all/${accommodationId}/not_deleted`);
    return this.http.get<AccommodationCommentDTO[]>(environment.apiHost + `api/accommodation_comments/all/${accommodationId}/not_deleted`);
  }

  remove(id: number) {
    return this.apiService.put(environment.apiHost + `api/accommodation_comments/remove/${id}`, id);
  }

  report(id: number) {
    return this.apiService.put(environment.apiHost + `api/accommodation_comments/report/${id}`, id);
  }
}
