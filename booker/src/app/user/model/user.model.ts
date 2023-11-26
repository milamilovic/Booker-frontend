import {UserType} from "../../enums/user-type.enum";

export interface User {
  _id: number;
  name: string;
  surname: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  type: UserType;
}
