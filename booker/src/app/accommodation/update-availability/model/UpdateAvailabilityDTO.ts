import {PriceType} from "../../../enums/price-type.enum";
import {Price} from "../../accommodation/model/price.model";

export interface UpdateAvailabilityDTO {
  startDate: object;
  endDate: object;
  price: Price;
  deadline: number;
}
