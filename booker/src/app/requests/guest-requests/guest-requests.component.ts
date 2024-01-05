import {Component, OnInit} from '@angular/core';
import {ReservationRequest} from "../../accommodation/accommodation/model/ReservationRequest";
import {RequestsModule} from "../requests.module";
import { CommonModule } from '@angular/common';
import {RequestService} from "../request.service";
import {AccommodationService} from "../../accommodation/accommodation.service";

@Component({
  selector: 'app-guest-requests',
  templateUrl: './guest-requests.component.html',
  styleUrls: ['./guest-requests.component.css']
})
export class GuestRequestsComponent implements OnInit{
  requests: ReservationRequest[] = [];

  constructor(private service: RequestService) {
  }

  ngOnInit(): void {
    const loggedId = Number(localStorage.getItem("loggedId"));
    this.service.getAllForGuest(loggedId).subscribe({
      next: (data: ReservationRequest[]) => {
        this.requests = data
      },
      error: (_) => {
        console.log("Greska!")
      }
    })
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
