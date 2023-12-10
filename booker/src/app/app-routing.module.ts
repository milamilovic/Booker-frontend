import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import {AccommodationListingComponent} from "./accommodation/accommodation-listing/accommodation-listing.component";
import {LoginComponent} from "./layout/login/login.component";
import {AccommodationComponent} from "./accommodation/accommodation/accommodation.component";
import {RegisterComponent} from "./layout/register/register.component";
import {GuestViewComponent} from "./user/guest-view/guest-view.component";
import {CreateAccommodationComponent} from "./accommodation/create-accommodation/create-accommodation.component";
import {OwnerViewComponent} from "./user/owner-view/owner-view.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'accommodation/:id', component: AccommodationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'guests', component: GuestViewComponent},
  {path: 'owner', component: OwnerViewComponent},
  {path: 'search/:startDate/:endDate/:location/:people', component: AccommodationListingComponent},
  {path: 'create_accommodation', component: CreateAccommodationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
