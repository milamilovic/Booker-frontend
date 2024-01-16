import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OwnerCommentDTO} from "../user/dto/OwnerCommentDTO";
import {Observable} from "rxjs";
import {environment} from "../../env/env";

@Injectable({
  providedIn: 'root'
})
export class CommentsAndRatingsService {

  constructor(private http: HttpClient) { }

  getAllCommentsForOwner(ownerId:number) : Observable<OwnerCommentDTO[]>{
    return this.http.get<OwnerCommentDTO[]>(environment.apiHost + "api/owner_comments/all/" + ownerId + "/comments");
  }
}
