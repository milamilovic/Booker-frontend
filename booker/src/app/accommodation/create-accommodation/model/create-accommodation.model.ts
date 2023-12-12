import {Amenity} from "../../accommodation/model/Amenity";
import {Image} from "../../accommodation/model/Image";
import {AccommodationType} from "../../../enums/accommodation-type";
import {Availability} from "../../accommodation/model/Availability";
import {Price} from "../../accommodation/model/price.model";
import {Address} from "../../accommodation/model/Address";
import {AmenityDTO} from "../../../amenity/AmenityDTO";


export interface CreateAccommodation {
  id?: number;
  title: string;
  description: string;
  address: Address;
  amenities: string[];
  // images: Image[];
  type: AccommodationType;
  startDate: object;
  endDate: object;
  price: Price;
  min_capacity: number;
  max_capacity: number;

}
