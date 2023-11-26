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
  // slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  //
  // constructor() {}
  //
  // ngOnInit(): void {
  //   this.slides[0] = {
  //     src: "../../../assets/kitchen-2165756_640.jpg",
  //   };
  //   this.slides[1] = {
  //     src: "../../../assets/apartment_image.jpg"
  //   }
  //   this.slides[2] = {
  //     src: "../../../assets/living-room.jpg"
  //   }
  // }
  //
  // onItemChange($event: any): void {
  //   console.log('Carousel onItemChange', $event);
  // }

}
