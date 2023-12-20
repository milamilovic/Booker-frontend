import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccommodationListingDto} from "./accommodation/model/accommodation-listing.model";
import {environment} from "../../env/env";
import {AccommodationViewDto} from "./accommodation/model/accommodation-view";
import {CreateAccommodation} from "./create-accommodation/model/create-accommodation.model";
import {ReservationRequest} from "./accommodation/model/ReservationRequest";
import {Image} from "./accommodation/model/Image";
import {UserService} from "../user/user.service";
import {Owner} from "../user/owner-view/model/owner.model";
import {Filter} from "./accommodation/model/Filter";
import {Amenity} from "./accommodation/model/Amenity";
import {PriceType} from "../enums/price-type.enum";
import {AccommodationRating} from "./accommodation/model/AccommodationRating";
import {UpdateAccommodationViewDTO} from "./dto/UpdateAccommodationViewDTO";
import {UpdateAddressDTO} from "./dto/UpdateAddressDTO";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private accListings: AccommodationListingDto[] = [];

  constructor(private http: HttpClient, private userService: UserService) { }

  searchAccommodations(startDate: string, endDate: string, location: string, people: number): Observable<AccommodationListingDto[]> {
    return this.http.get<AccommodationListingDto[]>(environment.apiHost + 'api/accommodations/' + 'search/' + startDate + '/' + endDate + '/' + location + '/' + people);
  }

  searchAndFilterAccommodations(startDate: string, endDate: string, location: string, people: number, filters: Filter[]): Observable<AccommodationListingDto[]> {
    const requestBody = JSON.stringify(filters);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<AccommodationListingDto[]>(environment.apiHost + 'api/accommodations/' + 'search/' + startDate + '/' + endDate + '/' + location + '/' + people + '/filter',
      requestBody,
      {headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'}});
  }

  getAccommodation(id: number): Observable<AccommodationViewDto> {
    return this.http.get<AccommodationViewDto>(environment.apiHost + 'api/accommodations/' + id)
  }

  checkDate(id: number | undefined, date: String): Observable<boolean> {
    return this.http.get<boolean>(environment.apiHost + 'api/availability/' + id + '/' + date);
  }


  add(createAccommodation: CreateAccommodation): Observable<CreateAccommodation> {
    return this.http.post<CreateAccommodation>(environment.apiHost + 'api/accommodations/add', createAccommodation)
  }
  makeReservationRequest(request: ReservationRequest): Observable<ReservationRequest> {
    return this.http.post<ReservationRequest>(environment.apiHost + 'api/requests', request)
  }

  createAccommodationWithPhotos(accommodationData: CreateAccommodation): Observable<CreateAccommodation> {

    return this.http.post<CreateAccommodation>(environment.apiHost + 'api/accommodations/' + 'add', accommodationData);
  }


  getOwner(id: number): Observable<Owner> {
    return this.userService.getOwnerById(id);
  }

  getAmenityNames() {
    return this.http.get<string[]>(environment.apiHost + 'api/amenities/names');
  }
  uploadFiles(accommodationId: number, file: File): Observable<void> {
    const formData = new FormData();
    formData.append("images", file);

    return this.http.post<void>(environment.apiHost + `api/accommodations/{$accommodationId}/upload_photos`, formData);

  }

  getPriceType(id: number | undefined) {
    return this.http.get<PriceType>(environment.apiHost + 'api/accommodations/priceType/' + id);
  }

  getPrice(id: number | undefined, startDate: string | undefined, endDate: string | undefined, people: number) {
    return this.http.get<number>(environment.apiHost + 'api/prices/' + id + '/' + startDate + '/'
    + endDate + '/' + people);
  }

  getRatings(id: number | undefined) {
    return this.http.get<AccommodationRating[]>(environment.apiHost + 'api/accommodation_ratings/all/' + id + '/ratings');
  }

  getAllForOwner(id: number): Observable<AccommodationListingDto[]>{
    return this.http.get<AccommodationListingDto[]>(environment.apiHost + 'api/accommodations/owner/' + id);
  }

  getAcceptedForOwner(id: number): Observable<AccommodationListingDto[]>{
    return this.http.get<AccommodationListingDto[]>(environment.apiHost + 'api/accommodations/owner/' + id + '/active');
  }

  removeImage(id: number, image: Image){
    return this.http.delete<void>(environment.apiHost + 'api/accommodations/' + id + '/remove_image/' + image.id);
  }

  uploadFile(id:number, files: File[]) {
    const data : FormData = new FormData();
    for (let file of files){
      data.append("images", file);
    }
    return this.http.post(environment.apiHost + 'api/accommodations/' + id + '/upload_images', data);
  }

  saveUpdatedAcc(accommodation: UpdateAccommodationViewDTO){
    console.log(accommodation);
    return this.http.put<String>(environment.apiHost + 'api/accommodations/update/' + accommodation._id, accommodation);
  }

  saveUpdatedAddr(id:number, address: UpdateAddressDTO){
    console.log(address);
    return this.http.put<String>(environment.apiHost + 'api/accommodations/update/' + id + '/address', address);
  }
}
