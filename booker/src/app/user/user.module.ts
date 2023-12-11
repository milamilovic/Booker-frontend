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



@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    GuestViewComponent,
    OwnerViewComponent
  ]
})
export class UserModule { }
