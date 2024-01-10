import {ReservationRequestStatus} from "../../enums/reservation-request-status.enum";
import {AccommodationViewDto} from "../../accommodation/accommodation/model/accommodation-view";
import {ReservationStatus} from "../../enums/reservation-status-enum";

export interface Reservation {
  guestId: number;
  accommodation?: AccommodationViewDto;
  id: number;
  fromDate: string;
  toDate: string;
  numberOfGuests: number;
  requestStatus: ReservationRequestStatus;
  status: ReservationStatus;
  deleted: boolean;
  price: number;
}
