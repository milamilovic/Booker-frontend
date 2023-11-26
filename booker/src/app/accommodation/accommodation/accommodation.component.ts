import {Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, FormsModule]
})
export class AccommodationComponent {

  slides = [
    {'image': "../../../assets/kitchen-2165756_640.jpg"},
    {'image': "../../../assets/apartment_image.jpg"},
    {'image': "../../../assets/living-room.jpg"}
   ];

}
