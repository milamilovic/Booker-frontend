import { Component } from '@angular/core';

@Component({
  selector: 'app-owner-view',
  templateUrl: './owner-view.component.html',
  styleUrls: ['./owner-view.component.css']
})
export class OwnerViewComponent {
  hide_new: boolean = true;
  hide_confirm : boolean = true;
}
