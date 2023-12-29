import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService, ConfigService} from "../service";
import {Router} from "@angular/router";
import {environment} from "../../env/env";

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
}
