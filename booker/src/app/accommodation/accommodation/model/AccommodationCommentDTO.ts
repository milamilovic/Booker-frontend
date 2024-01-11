import {ProfilePicture} from "../../../user/model/ProfilePicture";

export interface AccommodationCommentDTO {
  id: number;
  accommodationId: number;
  guestId: number;
  guestName: string;
  guestSurname: string;
  guestProfilePicture: ProfilePicture;
  content: string;
  rating: number;
  date: object;
  reported: boolean;
  deleted: boolean;
}
