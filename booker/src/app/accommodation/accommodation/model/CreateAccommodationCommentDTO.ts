export interface CreateAccommodationCommentDTO {
  accommodationId: number;
  guestId: number;
  content: string;
  rating: number;
}
