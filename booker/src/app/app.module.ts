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
import { UpdateAccommodationDetailsComponent } from './update-accommodation-details/update-accommodation-details.component';
import {TokenInterceptor} from "./interceptor/TokenInterceptor";
import { ActivationViewComponent } from './layout/activation-view/activation-view.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CreateAccommodationComponent,
    PhotoUploadComponent,
    UpdateAccommodationDetailsComponent,
    ActivationViewComponent
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
    SharedModule
  ],
  providers: [MapService, MapComponent,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
