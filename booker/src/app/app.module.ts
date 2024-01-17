import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LayoutModule} from "./layout/layout.module";
import { RegisterComponent } from './layout/register/register.component';
import {MaterialModule} from "./infrastructure/material/material.module";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {AccommodationModule} from "./accommodation/accommodation.module";
import {UserModule} from "./user/user.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { CreateAccommodationComponent } from './accommodation/create-accommodation/create-accommodation.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import {MapModule} from "./map/map.module";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import {MapService} from "./map/map.service";
import {MapComponent} from "./map/map.component";
import {TokenInterceptor} from "./interceptor/TokenInterceptor";
import { ActivationViewComponent } from './layout/activation-view/activation-view.component';
import { UpdateAvailabilityComponent } from './accommodation/update-availability/update-availability.component';
import {ReportsModule} from "./reports/reports.module";
import {ReservationsModule} from "./reservations/reservations.module";
import {GuestReservationCardComponent} from "./reservations/guest-reservation-card/guest-reservation-card.component";
import {GuestReservationsComponent} from "./reservations/guest-reservations/guest-reservations.component";
import { ReportUserComponent } from './user/report-user/report-user.component';
import {NotificationsModule} from "./notifications/notifications.module";
import {CommentsAndRatingsModule} from "./comments-and-ratings/comments-and-ratings.module";
import {RatingCardComponent} from "./comments-and-ratings/rating-card/rating-card.component";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CreateAccommodationComponent,
    PhotoUploadComponent,
    ActivationViewComponent,
    UpdateAvailabilityComponent,
    ReportUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatRadioModule,
    MatSelectModule,
    AccommodationModule,
    UserModule,
    HttpClientModule,
    MapModule,
    FormsModule,
    SharedModule,
    ReportsModule,
    ReservationsModule,
    NotificationsModule,
    CommentsAndRatingsModule
  ],
  providers: [MapService, MapComponent,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
