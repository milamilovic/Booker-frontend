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
import {AdminViewComponent} from "./user/admin-view/admin-view.component";
import {ActivationViewComponent} from "./layout/activation-view/activation-view.component";
import {
  OwnerAccommodationListingComponent
} from "./accommodation/owner-accommodation-listing/owner-accommodation-listing.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'accommodation/:id', component: AccommodationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'guests', component: GuestViewComponent},
  {path: 'owners', component: OwnerViewComponent},
  {path: 'admins', component: AdminViewComponent},
  {path: 'search/:startDate/:endDate/:location/:people', component: AccommodationListingComponent},
  {path: 'search/:startDate/:endDate/:location/:people/filter', component: AccommodationListingComponent},
  {path: 'create_accommodation', component: CreateAccommodationComponent},
  {path: 'owner/accommodations', component: OwnerAccommodationListingComponent},
  {path: 'activate_profile/:activationLink', component: ActivationViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
