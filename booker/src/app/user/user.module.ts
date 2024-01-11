import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestViewComponent } from './guest-view/guest-view.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MaterialModule} from "../infrastructure/material/material.module";
import {FormsModule} from "@angular/forms";
import { OwnerViewComponent } from './owner-view/owner-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import {RouterLink} from "@angular/router";
import {OwnerProfileComponent} from "./owner-profile/owner-profile.component";
import { GuestTableComponent } from './guest-table/guest-table.component';
import { GuestProfilesComponent } from './guest-profiles/guest-profiles.component';




@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MaterialModule,
        FormsModule,
        RouterLink
    ],
  declarations: [
    GuestViewComponent,
    OwnerViewComponent,
    AdminViewComponent,
    OwnerProfileComponent,
    GuestTableComponent,
    GuestProfilesComponent
  ]
})
export class UserModule { }
