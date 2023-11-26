import { Injectable } from '@angular/core';
import {User} from "../../user/model/user.model";

const USERS = [
  {
    _id: 1,
    name: "Marko",
    surname: "Markovic",
    email: "email1",
    address: "addressa",
    phone: "12345678890",
    password: "123"
  }
]

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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
        password: userObj.password
      };
      this.usersList.push(user);
    }
  }

  getAll(): User[] {
    return this.usersList;
  }

  add(user: User) : void {
    this.usersList.push(user);
  }
}
