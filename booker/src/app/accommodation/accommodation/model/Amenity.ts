import {Image} from "./Image";

export interface Amenity {
  id?: number;
  name: string;
  accommodation: object;
  image: Image;
}
