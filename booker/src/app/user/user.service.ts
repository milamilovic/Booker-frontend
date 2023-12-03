import {Injectable} from '@angular/core';
import {UserType} from "../enums/user-type.enum";
import {User} from "./model/user.model";


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


  constructor() {
    for (let userObj of USERS) {
      const user: User = {
        _id: userObj._id,
        name: userObj.name,
        surname: userObj.surname,
        email: userObj.email,
        address: userObj.address,
        phone: userObj.phone,
        password: userObj.password,
        type: userObj.type
      };
      this.usersList.push(user);
    }
  }

  getAll() : User[] {
    return this.usersList;
  }

  add(user: User) : void {
    this.usersList.push(user);
  }

}

