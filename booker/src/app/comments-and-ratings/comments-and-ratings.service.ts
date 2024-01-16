import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OwnerCommentDTO} from "../user/dto/OwnerCommentDTO";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {OwnerRatingDTO} from "../user/dto/OwnerRatingDTO";

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
}
