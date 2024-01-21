import {Image} from "./Image";
import {Address} from "./Address";

export interface FavouriteAccommodation {
  id: number;
  title: string;
  shortDescription: string;
  image: Image;
  avgPrice: number;
  avgRating: number;
  address: Address;
}
