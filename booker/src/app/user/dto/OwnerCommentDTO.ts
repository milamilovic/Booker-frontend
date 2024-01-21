import {ProfilePicture} from "../model/ProfilePicture";

export interface OwnerCommentDTO {
  id: number;
  ownerId: number;
  guestId: number;
  guestName: string;
  guestSurname: string;
  guestProfilePicture: ProfilePicture;
  content: string;
  rating: number;
  date: Date;
  reported: boolean;
  deleted: boolean;
  approved: boolean;
}
