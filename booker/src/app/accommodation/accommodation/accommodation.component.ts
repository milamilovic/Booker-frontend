import {Component, OnInit} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule} from "@angular/forms";
import {AccommodationViewDto} from "./model/accommodation-view";
import {ActivatedRoute} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {Image} from "./model/Image";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
  standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, FormsModule, NgForOf, NgIf]
})
export class AccommodationComponent implements OnInit {
  accommodation!: AccommodationViewDto;

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

}
