import {Component, OnInit} from '@angular/core';
import {ReservationRequest} from "../../accommodation/accommodation/model/ReservationRequest";
import {RequestsModule} from "../requests.module";
import { CommonModule } from '@angular/common';
import {RequestService} from "../request.service";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Filter} from "../../accommodation/accommodation/model/Filter";
import {AccommodationListingDto} from "../../accommodation/accommodation/model/accommodation-listing.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-guest-requests',
  templateUrl: './guest-requests.component.html',
  styleUrls: ['./guest-requests.component.css']
})
export class GuestRequestsComponent implements OnInit{
  requests: ReservationRequest[] = [];
  amenities: string[] = ["accepted", "waiting", "denied"];
  selectedAmenities: { [key: string]: boolean } = {};
  submitted: boolean = false;
  form = new FormGroup({
    accName: new FormControl('', [Validators.minLength(0)]),
    searchDate: new FormControl('', [Validators.minLength(0)])
  });
  searchDate: string = '';
  accName: string = '';

  constructor(private service: RequestService,
              private formBuilder: FormBuilder,
              private router: Router) {
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
    this.form = this.formBuilder.group({
      accName: ['', [Validators.minLength(0)]],
      searchDate: ['', [Validators.minLength(0)]]
    });
  }

  onCheckboxChange(status: string) {
    console.log("filter change: " + status);
    let isSelected = this.selectedAmenities[status];
    this.selectedAmenities[status] = isSelected;
  }

  formatDateToString(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because it is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${year}-${month}-${day}`;

  }

  search(where_input: HTMLInputElement, search_date: HTMLInputElement) {
    const loggedId = Number(localStorage.getItem("loggedId"));
    this.accName = where_input.value;
    if(search_date.value!="") {
      this.searchDate = this.formatDateToString(new Date(search_date.value));
    }
    if(this.accName==='' && this.searchDate==='') {
      console.log("both empty")
      alert("Please fill at least one of the search fields")
    } else {
      let filters: Filter[] = [];
      for (let key in this.amenities) {
        console.log('status: ' + this.amenities[key]);
        let isSelected = this.selectedAmenities[this.amenities[key]];
        console.log(isSelected);
        if (isSelected) {
          filters.push({
            "name": this.amenities[key],
            "value": {
              "checked": true
            }
          });
        }
      }
      if (filters.length != 0) {
        if(this.searchDate==="") {
          this.searchDate = "1111-01-01";
        }
        if(this.accName==="") {
          this.accName="noNameSearching";
        }
        this.service.searchAndFilterRequests(this.searchDate, this.accName, loggedId, filters).subscribe({
          next: (data: ReservationRequest[]) => {
            this.requests = data
          },
          error: (_) => {
            console.log("Greska!")
          }
        })
        if(this.accName==="noNameSearching") {
          this.accName = "";
        }
        if(this.searchDate==="1111-01-01") {
          this.searchDate='';
        }
      } else {
        //if there are no filtering params, then we are just searching
        if(this.searchDate==="") {
          this.searchDate = "1111-01-01";
        }
        if(this.accName==="") {
          this.accName="noNameSearching";
        }
        this.service.searchRequests(this.searchDate, this.accName, loggedId).subscribe({
          next: (data: ReservationRequest[]) => {
            this.requests = data
          },
          error: (_) => {
            console.log("Greska!")
          }
        })
        if(this.accName==="noNameSearching") {
          this.accName = "";
        }
        if(this.searchDate==="1111-01-01") {
          this.searchDate='';
        }
      }
    }
  }

  filter() {
    const loggedId = Number(localStorage.getItem("loggedId"));
    let filters: Filter[] = [];
    for (let key in this.amenities) {
      console.log('status: ' + this.amenities[key]);
      let isSelected = this.selectedAmenities[this.amenities[key]];
      console.log(isSelected);
      if (isSelected) {
        filters.push({
          "name": this.amenities[key],
          "value": {
            "checked": true
          }
        });
      }
    }
    if (filters.length != 0) {
      this.service.filterRequests(loggedId, filters).subscribe({
        next: (data: ReservationRequest[]) => {
          this.requests = data
        },
        error: (_) => {
          console.log("Greska!")
        }
      })
    } else {
      alert("you need to check at least one filter to apply filters! P.S. to search AND filter click search")
    }
  }
}
