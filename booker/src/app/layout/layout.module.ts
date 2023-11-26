import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import {RouterLink} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginComponent} from "./login/login.component";
import {MaterialModule} from "../infrastructure/material/material.module";



@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    LoginComponent
  ],
  exports: [
    NavBarComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MaterialModule
  ]
})
export class LayoutModule { }
