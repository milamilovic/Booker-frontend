import {PriceType} from "../../../enums/price-type.enum";

export interface Price {
  id?: number;
  cost: number;
  fromDate: string;
  toDate: string;
  type: PriceType

}
