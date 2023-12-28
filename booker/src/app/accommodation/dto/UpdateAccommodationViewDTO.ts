import {Address} from "../accommodation/model/Address";
import {Amenity} from "../accommodation/model/Amenity";
import {Image} from "../accommodation/model/Image";

export interface UpdateAccommodationViewDTO{
  _id: number;
  title?: string;
  description?: string;
  images?: Image[];
  manual_accepting: boolean;
}
