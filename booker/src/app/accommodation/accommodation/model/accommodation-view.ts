import {Image} from "./Image";
import {Amenity} from "./Amenity";
import {Availability} from "./Availability";

export interface AccommodationViewDto {
  id?: number;
  title: string;
  description: string;
  address: string;
  amenities: Amenity[];
  images: Image[];
  availabilities: Availability[];
  prices: object;
  ratings: object;
  comments: object;
}
