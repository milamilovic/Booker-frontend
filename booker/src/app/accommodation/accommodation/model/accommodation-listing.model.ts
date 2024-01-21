import {Image} from "./Image";

export interface AccommodationListingDto {
  id?: number;
  title: string;
  description: string;
  image: Image;
  rating: number;
  totalPrice: number;
  pricePerDay: number;
}
