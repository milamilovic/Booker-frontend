import {User} from "../../model/user.model";

export interface Guest extends User {
  reported: boolean;
  blocked: boolean;
  deleted: boolean;
  favouriteAccommodations: number[];
}
