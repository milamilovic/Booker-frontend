import {PriceType} from "../../../enums/price-type.enum";
import {Price} from "../../accommodation/model/price.model";

export interface UpdateAvailabilityDTO {
  start_date: object;
  end_date: object;
  price: Price;
  deadline: number;
}
