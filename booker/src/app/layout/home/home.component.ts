import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  submitted: boolean = false;
  form = new FormGroup({
    people: new FormControl('', [Validators.required,
      Validators.min(1)]),
    location: new FormControl('', [Validators.required, Validators.minLength(1)]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required])
  });
  startDate: string = '';
  endDate: string = '';
  location: string = '';
  people: number = 0;

  constructor(private service: AccommodationService, private router: Router,
              private formBuilder: FormBuilder) {
  }

  private areFormParametersValid(location: string, startDate: string, endDate: string, people: number) {
    if (!location || !startDate || !endDate || !people) {
      return false;
    }
    return true
  }

  search(location: HTMLInputElement, startDate: HTMLInputElement, endDate: HTMLInputElement, people: HTMLInputElement) {
    if (this.form.valid
      && (new Date(this.startDate) > new Date() && new Date(this.endDate) > new Date() && new Date(this.endDate) > new Date(this.startDate))) {

      console.log("parametri: " + startDate.value + ", " + endDate.value + ", " + location.value + ", " + people.value)
      this.router.navigate(['/search', startDate.value, endDate.value, location.value, Number(people.value)]);
    } else {
        if(new Date(this.startDate) < new Date() || new Date(this.endDate) < new Date()) {
          alert("You can not search past dates")
        } else if(new Date(this.endDate) <= new Date(this.startDate)) {
          alert("Trip can not end before it starts!")
        } else {
          if(this.people < 1) {
            alert("Number of guests can not be less than 0!")
          } else {
            alert("Please fill all required fields (location, dates and number of guests)")
          }
        }

    }

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
    people: ['', [Validators.required, Validators.min(1)]],
    location: ['', [Validators.required, Validators.minLength(1)]],
    start: ['', [Validators.required]],
    end: ['', [Validators.required]]
  });
  }
}
