import {ReservationRequestStatus} from "../../../enums/reservation-request-status.enum";

export interface ReservationRequest {
    guestId: number;
    accommodationId: number;
    id: number;
    fromDate: string;
    toDate: string;
    numberOfGuests: number;
    status: ReservationRequestStatus;
    deleted: boolean;
    price: number;
}
