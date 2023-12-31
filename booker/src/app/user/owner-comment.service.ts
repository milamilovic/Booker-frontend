import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService, ConfigService} from "../service";
import {Router} from "@angular/router";
import {environment} from "../../env/env";
import {Observable} from "rxjs";
import {OwnerCommentDTO} from "./dto/OwnerCommentDTO";

@Injectable({
  providedIn: 'root'
})
export class OwnerCommentService {

  constructor(private http: HttpClient,
              private apiService : ApiService,
              private configService : ConfigService,
              private router: Router) { }

  add(createOwnerCommentDTO: any) {
    return this.apiService.post(environment.apiHost + "api/owner_comments/add_comment", createOwnerCommentDTO);
  }

  getAllForOwner(ownerId: number): Observable<OwnerCommentDTO[]> {
    console.log(ownerId);
    console.log(environment.apiHost + `api/owner_comments/all/${ownerId}/comments`);
    return this.http.get<OwnerCommentDTO[]>(environment.apiHost + `api/owner_comments/all/${ownerId}/comments`)
  }

  remove(id: number) {
    return this.apiService.put(environment.apiHost + `api/owner_comments/remove/${id}`, id);
  }

  findAllNotDeletedForOwner(ownerId: number): Observable<OwnerCommentDTO[]> {
    console.log(ownerId);
    console.log(environment.apiHost + `api/owner_comments/all/${ownerId}/not_deleted`);
    return this.http.get<OwnerCommentDTO[]>(environment.apiHost + `api/owner_comments/all/${ownerId}/not_deleted`);
  }

  reportComment(comment_id: number) {
    console.log(comment_id);
    console.log(environment.apiHost + `api/owner_comments/report/${comment_id}`);
    return this.apiService.put(environment.apiHost + `api/owner_comments/report/${comment_id}`, comment_id);
  }
}
