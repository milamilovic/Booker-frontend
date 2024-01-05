import { Component, OnInit } from '@angular/core';
import {RequestsModule} from "../requests.module";
import {ReservationRequest} from "../../accommodation/accommodation/model/ReservationRequest";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-requests',
  templateUrl: './owner-requests.component.html',
  styleUrls: ['./owner-requests.component.css']
})
export class OwnerRequestsComponent {
  requests: ReservationRequest[] = [
    {
      "guestId": 1,
      "accommodationId": 101,
      "id": 1001,
      "fromDate": "2023-01-01",
      "toDate": "2023-01-07",
      "numberOfGuests": 2,
      "status": 1,
      "deleted": false,
      "price": 150.0
    },
    {
      "guestId": 2,
      "accommodationId": 102,
      "id": 1002,
      "fromDate": "2023-02-01",
      "toDate": "2023-02-14",
      "numberOfGuests": 1,
      "status": 2,
      "deleted": false,
      "price": 200.0
    },
    {
      "guestId": 3,
      "accommodationId": 103,
      "id": 1003,
      "fromDate": "2023-03-01",
      "toDate": "2023-03-10",
      "numberOfGuests": 4,
      "status": 0,
      "deleted": false,
      "price": 300.0
    }];

  ngOnInit(): void {

  }

  onCheckboxChange(status: string) {
    console.log("filter change: " + status);
    // let isSelected = this.selectedAmenities[amenity];
    // this.selectedAmenities[amenity] = isSelected;
    if(status==='waiting') {
      //waiting
    } else if(status==='accepted') {
      //accepted
    } else {
      //denied
    }
  }
}
