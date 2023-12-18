import {User} from "../../../user/model/user.model";

export interface AccommodationRating {
  id: number;
  accommodation: object;
  guest: object;
  rate: number;
  date: Date;
  reported: boolean;
}
