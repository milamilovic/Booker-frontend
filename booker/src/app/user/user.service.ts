import {Injectable} from '@angular/core';
import {UserType} from "../enums/user-type.enum";
import {User} from "./model/user.model";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {Guest} from "./guest-view/model/guest.model";
import {environment} from "../../env/env";
import {UpdateUserDTO} from "./dto/UpdateUserDTO";
import {Owner} from "./owner-view/model/owner.model";
import {Admin} from "./admin-view/model/admin.model";


const USERS = [
  {
    _id: 1,
    name: 'Marko',
    surname: 'Markovic',
    email: 'email1',
    address: 'addressa',
    phone: '12345678890',
    password: '123',
    type: UserType.Guest,
  },
  {
    _id: 2,
    name: 'Petar',
    surname: 'Petrovic',
    email: 'email2',
    address: 'adresa 23',
    phone: '1234670',
    password: '12345',
    type: UserType.Owner,
  }
]

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersList: User[] = [];


  constructor(private http: HttpClient) { }

  getGuests(): Observable<Guest>{
    return this.http.get<Guest>(environment.apiHost + 'guests/all');
  }

  getGuestById(id: number): Observable<Guest>{
    return this.http.get<Guest>(environment.apiHost + 'guests/' + id);
  }

  getOwners(): Observable<Owner>{
    return this.http.get<Owner>(environment.apiHost + 'owners/all');
  }

  getOwnerById(id: number): Observable<Owner>{
    return this.http.get<Owner>(environment.apiHost + 'owners/' + id);
  }

  getAdmin(id: number): Observable<Admin>{
    return this.http.get<Admin>(environment.apiHost + 'admins/' + id);
  }

  getAll() : User[] {
    return this.usersList;
  }

  add(user: User) : void {
    this.usersList.push(user);
  }

  updateGuest(id: number, updateUser: UpdateUserDTO): Observable<UpdateUserDTO> {
    return this.http.put<UpdateUserDTO>(environment.apiHost + 'guests/' + id, updateUser);
  }

  updateOwner(id: number, updateUser: UpdateUserDTO): Observable<UpdateUserDTO> {
    return this.http.put<UpdateUserDTO>(environment.apiHost + 'owners/' + id, updateUser);
  }

  updateAdmin(id: number, updateUser: UpdateUserDTO): Observable<UpdateUserDTO> {
    return this.http.put<UpdateUserDTO>(environment.apiHost + 'admins/' + id, updateUser);
  }

  deleteGuest(id: number): Observable<Boolean> {
    return this.http.put<Boolean>(environment.apiHost + 'guests/delete/' + id, {}).pipe(
      map(response => {
        if (!response){

        }
        return response;
      }),
      catchError(error => {
        console.error('Error: ', error);
        throw error;
      })
    );
  }

  deleteOwner(id: number): Observable<Boolean> {
    return this.http.put<Boolean>(environment.apiHost + 'owners/delete/' + id, {}).pipe(
      map(response => {
        if (!response){

        }
        return response;
      }),
      catchError(error => {
        console.error('Error: ', error);
        throw error;
      })
    );
  }
}

