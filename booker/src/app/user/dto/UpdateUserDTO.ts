import {ProfilePicture} from "../model/ProfilePicture";

export interface UpdateUserDTO {
  _id: number;
  name?: string;
  surname?: string;
  email?: string;
  address?: string;
  phone?: string;
  password?: string;
  profilePicture?: ProfilePicture;
}
