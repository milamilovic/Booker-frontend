import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
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
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {Image} from "./model/Image";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ReservationRequest} from "./model/ReservationRequest";
import {ReservationRequestStatus} from "../../enums/reservation-request-status.enum";
import {Owner} from "../../user/owner-view/model/owner.model";
import {Observable} from "rxjs";
import {MapModule} from "../../map/map.module";
import {MapComponent} from "../../map/map.component";
import {UserService} from "../../user/user.service";
import {Guest} from "../../user/guest-view/model/guest.model";
import {SharedService} from "../../shared/shared.service";
import {Availability} from "./model/Availability";

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, FormsModule, NgForOf, NgIf, RouterLink, DatePipe, MapModule]
})

export class AccommodationComponent implements OnInit  {
  accommodation!: AccommodationViewDto;
  totalPrice: string = "Total price";
  owner!: Owner;
  price: number = 0;
  startDate: Date = new Date();
  endDate: Date = new Date();
  people: number = 1;
  loggedInGuest: number = 0;
  invalidDateFiter: any;
  available: boolean = false;

  constructor(private route: ActivatedRoute, private sharedService: SharedService, private userService: UserService, private service: AccommodationService, private map: MapComponent) {
  }

  ngOnInit(): void {
    //getting the user - if not guest hide reservation request div
    const loggedIn = localStorage.getItem("loggedId");
    console.log(loggedIn)
    if(loggedIn) {
      this.userService.getGuestById(Number(loggedIn)).subscribe( {
        next: (result: Guest) => {
          this.loggedInGuest = Number(loggedIn);
        },
        error: (_) => {     //owner or admin
          this.loggedInGuest = 0;
        }
      })
    }
    this.route.params.subscribe((params) => {
      const id = +params['id']
      this.service.getAccommodation(id).subscribe({
        next: (data: AccommodationViewDto) => {
          this.accommodation = data;
          this.service.getOwner(this.accommodation.owner_id).subscribe({
            next: (owner: Owner) => {
              this.owner = owner;
            }
          })
          //disable dates
          this.invalidDateFiter = (d: Date | null): boolean => {
            const selectedDate = d || new Date();

            // Prevent dates that return false in the checkDate method from being selected.
            let isAvailable = this.checkDate(new Date(selectedDate.toString()));
            console.log("date " + selectedDate.toString() + "is available: " + isAvailable);
            return isAvailable;
          };
        }
      })
    })
  }

  closed() {
    // dateRangeStart.value, dateRangeEnd.value to get dates
    const year1 = this.startDate.getFullYear();
    const month1 = (this.startDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day1 = this.startDate.getDate().toString().padStart(2, '0');
    const formattedFromDate = `${year1}-${month1}-${day1}`;
    const year2 = this.endDate.getFullYear();
    const month2 = (this.endDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day2 = this.endDate.getDate().toString().padStart(2, '0');
    console.log(year2 + ", " + month2 + ", " + day2)
    const formattedToDate = `${year2}-${month2}-${day2}`;
    this.service.getPrice(this.accommodation.id, formattedFromDate, formattedToDate, this.people).subscribe(
      {
        next: (data: number) => {
          this.price = data;
          this.totalPrice = this.price.toFixed(2) + " $";
          console.log(this.price);
        },
        error: (_) => {}
      }
    );
  }

  makeReservation() {
    let id = 0;
    this.route.params.subscribe((params) => {
      id = +params['id']
    });
    const year1 = this.startDate.getFullYear();
    const month1 = (this.startDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day1 = this.startDate.getDate().toString().padStart(2, '0');
    console.log(year1 + ", " + month1 + ", " + day1)
    const formattedFromDate = `${year1}-${month1}-${day1}`;

    const year2 = this.endDate.getFullYear();
    const month2 = (this.endDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day2 = this.endDate.getDate().toString().padStart(2, '0');
    console.log(year2 + ", " + month2 + ", " + day2)
    const formattedToDate = `${year2}-${month2}-${day2}`;

    const request: ReservationRequest = {
      guestId: this.loggedInGuest,
      accommodationId: id,
      id: -1,
      fromDate: formattedFromDate,
      toDate: formattedToDate,
      numberOfGuests: this.people,
      status: ReservationRequestStatus.WAITING,
      deleted: false,
      price: Number(this.price.toFixed(2))
    }
    this.service.makeReservationRequest(request).subscribe(
      {
        next: (data: ReservationRequest) => {
          //TODO: navigate to my reservations?
          console.log("made reservation request: ")
          console.log(data)
          this.sharedService.openSnack("You successfully made a reservation request!")
        },
        error: (_) => {}
      }
    );
  }

  private checkDate(selectedDate: Date) {
    for(let a in this.accommodation.availabilities) {
      let availability: Availability = this.accommodation.availabilities[a];
      let startDate = new Date(availability.startDate.toString())
      let endDate = new Date(availability.endDate.toString())
      if(selectedDate >= startDate && selectedDate <= endDate) {
        return true;
      }
    }
    return false;
  }
}
