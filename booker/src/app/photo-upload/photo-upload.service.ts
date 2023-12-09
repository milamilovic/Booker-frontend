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

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(this.baseApiUrl, formData, {headers});
  }

  uploadAccommodationWithImages(accommodation: CreateAccommodation, images: File[]): Observable<AccommodationViewDto> {
    const formData = new FormData();

    // Append accommodation data as a JSON string
    formData.append('accommodation', JSON.stringify(accommodation));

    // Append each image separately
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    // Send the request with appropriate headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<AccommodationViewDto>(this.baseApiUrl, formData, { headers });
  }
}
