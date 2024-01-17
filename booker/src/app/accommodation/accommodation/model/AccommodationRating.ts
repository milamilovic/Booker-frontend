import {Guest} from "../../../user/guest-view/model/guest.model";

export interface AccommodationRating {
  id: number;
  accommodationId: number;
  guestId: number;
  rate: number;
  date: Date;
  reported: boolean;
  deleted: boolean;
}
