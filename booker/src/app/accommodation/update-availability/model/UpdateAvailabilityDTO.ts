import {PriceType} from "../../../enums/price-type.enum";
import {Price} from "../../accommodation/model/price.model";

export interface UpdateAvailabilityDTO {
  startDate: string;
  endDate: string;
  price: Price;
  deadline: number;
}
