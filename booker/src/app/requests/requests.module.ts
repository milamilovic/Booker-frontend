import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestCardComponent } from './guest-card/guest-card.component';
import { OwnerCardComponent } from './owner-card/owner-card.component';
import { GuestRequestsComponent } from './guest-requests/guest-requests.component';
import { OwnerRequestsComponent } from './owner-requests/owner-requests.component';



@NgModule({
  declarations: [
    GuestCardComponent,
    OwnerCardComponent,
    GuestRequestsComponent,
    OwnerRequestsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RequestsModule { }
