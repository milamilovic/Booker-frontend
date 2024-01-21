import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OwnerCommentDTO} from "../user/dto/OwnerCommentDTO";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {OwnerRatingDTO} from "../user/dto/OwnerRatingDTO";
import {AccommodationCommentDTO} from "../accommodation/accommodation/model/AccommodationCommentDTO";
import {AccommodationRating} from "../accommodation/accommodation/model/AccommodationRating";

@Injectable({
  providedIn: 'root'
})
export class CommentsAndRatingsService {

  constructor(private http: HttpClient) { }

  getAllCommentsForOwner(ownerId:number) : Observable<OwnerCommentDTO[]>{
    return this.http.get<OwnerCommentDTO[]>(environment.apiHost + "api/owner_comments/all/" + ownerId + "/comments");
  }

  getAllRatingsForOwner(ownerId:number) : Observable<OwnerRatingDTO[]> {
    return this.http.get<OwnerRatingDTO[]>(environment.apiHost + "api/owner_ratings/" + ownerId + "/ratings");
  }

  deleteComment(commentId:number) {
    return this.http.put<Observable<void>>(environment.apiHost + "api/owner_comments/delete/" + commentId, {});
  }

  deleteRating(ratingId:number) {
    return this.http.put<Observable<void>>(environment.apiHost + "api/owner_ratings/delete/" + ratingId, {});
  }

  getAllCommentsForAccommodation(id:number):Observable<AccommodationCommentDTO[]>{
    return this.http.get<AccommodationCommentDTO[]>(environment.apiHost + "api/accommodation_comments/" +
    id + "/comments");
  }

  getAllRatingsForAccommodation(id:number):Observable<AccommodationRating[]>{
    return this.http.get<AccommodationRating[]>(environment.apiHost + "api/accommodation_ratings/all/" +
      id + "/ratings");
  }

  deleteAccommodationComment(commentId:number) {
    return this.http.put<Observable<void>>(environment.apiHost + "api/accommodation_comments/delete/" + commentId, {});
  }

  deleteAccommodationRating(ratingId:number) {
    return this.http.put<Observable<void>>(environment.apiHost + "api/accommodation_ratings/delete/" + ratingId, {});
  }

  approveAccommodationComment(commentId:number) {
    return this.http.put<Observable<void>>(environment.apiHost + `api/accommodation_comments/approve/${commentId}`, {});
  }

  approveOwnerComment(commentId:number) {
    return this.http.put<Observable<void>>(environment.apiHost + `api/owner_comments/approve/${commentId}`, {});
  }
}
