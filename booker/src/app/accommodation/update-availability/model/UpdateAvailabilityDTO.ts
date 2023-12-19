import {PriceType} from "../../../enums/price-type.enum";

export interface UpdateAvailabilityDTO {
  start_date: Object;
  end_date: Object;
  amount: number;
  price_type: PriceType;
  deadline: number;
}
