import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent {

  slides = [
    {'image': "../../../assets/kitchen-2165756_640.jpg"},
    {'image': "../../../assets/apartment_image.jpg"},
    {'image': "../../../assets/living-room.jpg"}
   ];

}
