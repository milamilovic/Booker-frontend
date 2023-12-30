export interface OwnerRatingDTO {
  _id: number;
  ownerId: number;
  guestId: number;
  rate: number;
  date: object;
  reported: boolean;
  deleted: boolean;
}
