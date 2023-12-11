import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../../accommodation/accommodation.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private service: AccommodationService, private router: Router) {
  }

  private areFormParametersValid(location: string, startDate: string, endDate: string, people: number) {
    if (!location || !startDate || !endDate || !people) {
      return false;
    }
    return true
  }

  search(location: HTMLInputElement, startDate: HTMLInputElement, endDate: HTMLInputElement, people: HTMLInputElement) {
    console.log("parametri: " + startDate.value + ", " + endDate.value + ", " + location.value + ", " + people.value)
    if (this.areFormParametersValid(location.value, startDate.value, endDate.value, Number(people.value))) {
      this.router.navigate(['/search', startDate.value, endDate.value, location.value, Number(people.value)]);
    } else {
      console.error('Form parameters are invalid.');
    }
  }
}
