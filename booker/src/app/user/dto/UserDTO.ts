import {UserType} from "../../enums/user-type.enum";
import {ProfilePicture} from "../model/ProfilePicture";

export interface UserDTO {
  _id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: UserType;
  profilePicture: ProfilePicture;
}
