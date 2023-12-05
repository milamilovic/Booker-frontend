import { Component } from '@angular/core';

@Component({
  selector: 'app-guest-view',
  templateUrl: './guest-view.component.html',
  styleUrls: ['./guest-view.component.css']
})
export class GuestViewComponent {
  hide_new: boolean = true;
  hide_confirm : boolean = true;
}
