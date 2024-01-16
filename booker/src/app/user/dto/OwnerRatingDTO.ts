export interface OwnerRatingDTO {
  id: number;
  ownerId: number;
  guestId: number;
  rate: number;
  date: Date;
  reported: boolean;
  deleted: boolean;
}
