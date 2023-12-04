import {Component, OnInit} from '@angular/core';
import {
  DateRange,
  ExtractDateTypeFromSelection,
  MatDatepickerInputEvent,
  MatDatepickerModule
} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule} from "@angular/forms";
import {AccommodationViewDto} from "./model/accommodation-view";
import {ActivatedRoute} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {Image} from "./model/Image";
import {NgForOf, NgIf} from "@angular/common";
import {ReservationRequest} from "./model/ReservationRequest";
import {ReservationRequestStatus} from "../../enums/reservation-request-status.enum";

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
  standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, FormsModule, NgForOf, NgIf]
})
export class AccommodationComponent implements OnInit {
  accommodation!: AccommodationViewDto;
  totalPrice: string = "Total price";

  constructor(private route: ActivatedRoute, private service: AccommodationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id']
      this.service.getAccommodation(id).subscribe({
        next: (data: AccommodationViewDto) => {
          this.accommodation = data;
        }
      })
    })
  }

  closed(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    // dateRangeStart.value, dateRangeEnd.value to get dates
    let num = Math.random() * 1000;
    this.totalPrice = num.toFixed(2) + " $";
    console.log(dateRangeEnd.value);
  }

  makeReservation(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement, peopleInput: HTMLInputElement) {
    const request: ReservationRequest = {
      guestId: 1,
      accommodationId: 1,
      id: 1,
      fromDate: dateRangeStart.value.toString(),
      toDate: dateRangeEnd.value.toString(),
      numberOfGuests: parseInt(peopleInput.value, 10),
      status: ReservationRequestStatus.WAITING,
      deleted: false,
      price: 100
    }
    this.service.makeReservationRequest(request).subscribe(
        {
          next: (data: ReservationRequest) => {
            //TODO: navigate to my reservations?
            //this.router.navigate(['wine'])
            console.log("made reservation request: ")
            console.log(data)
          },
          error: (_) => {}
        }
    );
  }
}
