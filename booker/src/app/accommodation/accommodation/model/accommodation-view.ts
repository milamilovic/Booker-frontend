import {Image} from "./Image";
import {Amenity} from "./Amenity";
import {Availability} from "./Availability";
import {Address} from "./Address";

export interface AccommodationViewDto {
  id?: number;
  title: string;
  description: string;
  address: Address;
  amenities: Amenity[];
  images: Image[];
  availabilities: Availability[];
  prices: object;
  ratings: object;
  comments: object;
  owner_id: number;
  min_capacity: number;
  max_capacity: number;
}
