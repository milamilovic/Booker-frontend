import {Injectable} from '@angular/core';
import {UserType} from "../enums/user-type.enum";
import {User} from "./model/user.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Guest} from "./guest-view/model/guest.model";
import {environment} from "../../env/env";
import {UpdateUserDTO} from "./dto/UpdateUserDTO";


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

  getAll() : User[] {
    return this.usersList;
  }

  add(user: User) : void {
    this.usersList.push(user);
  }

  updateUser(id: number, updateUser: UpdateUserDTO): Observable<UpdateUserDTO> {
    return this.http.put<UpdateUserDTO>(environment.apiHost + 'guests', updateUser);
  }
}

