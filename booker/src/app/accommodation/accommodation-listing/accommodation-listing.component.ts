import {Component, ElementRef, OnInit} from '@angular/core';
import {AccommodationListingDto} from "../accommodation/model/accommodation-listing.model";
import {AccommodationService} from "../accommodation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Filter} from "../accommodation/model/Filter";
@Component({
  selector: 'app-accommodation-listing',
  templateUrl: './accommodation-listing.component.html',
  styleUrls: ['./accommodation-listing.component.css']
})
export class AccommodationListingComponent implements OnInit {
  accommodations: AccommodationListingDto[] = [];
  clickedAcc: string = ''
  startDate: string = '';
  endDate: string = '';
  location: string = '';
  people: number = 0;

  constructor(private service: AccommodationService, private route: ActivatedRoute,
              private elemRef : ElementRef, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.startDate = String(params['startDate']);
      this.endDate = String(params['endDate']);
      this.location = String(params['location']);
      this.people = +params['people'];
      console.log("parametri: " + this.startDate + ", " + this.endDate + ", " + this.location + ", " + this.people)
      this.service.searchAccommodations(this.startDate, this.endDate, this.location, this.people).subscribe({
        next: (data: AccommodationListingDto[]) => {
          this.accommodations = data
        },
        error: (_) => {
          console.log("Greska!")
        }
      })
    })
  }

  onAccommodationClick(accommodation: AccommodationListingDto) {
    this.clickedAcc = accommodation.title + " " + accommodation.id;
  }

  search(where_input: HTMLInputElement, from_date: HTMLInputElement, to_date: HTMLInputElement, people_input: HTMLInputElement) {
    let location = where_input.value;
    let start_date = from_date.value;
    let end_date = to_date.value;
    let people_search = Number(people_input.value);
    let filters: Filter[] = [];
    //TODO: make amenities dynamic (get amenity names from back)
    let amenityNames: String[] = ['wifi', 'ac', 'goodLocation', 'cancellation'];
    for(let amenity in amenityNames) {
      let amenityCheck = this.elemRef.nativeElement.querySelector('amenity');
      if(amenityCheck!=null && amenityCheck.isChecked()) {
        filters.push({
          "name": amenity,
          "value": {
            "checked": true
          }
        });
      }
    }
    console.log("filterig!!!")
    this.service.searchAndFilterAccommodations(start_date, end_date, location, people_search, filters).subscribe({
      next: (data: AccommodationListingDto[]) => {
        this.accommodations = data
      },
      error: (_) => {
        console.log("Greska!")
      }
    })
    //this.router.navigate(['/search', start_date.value, end_date.value, location.value, Number(people.value), '/filter']);
  }
}
