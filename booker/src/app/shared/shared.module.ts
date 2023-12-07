import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SnackBarComponent} from "./snack-bar/snack-bar.component";
import {MaterialModule} from "../infrastructure/material/material.module";
import {SharedService} from "./shared.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";



@NgModule({
  declarations: [SnackBarComponent],
  imports: [
    CommonModule, MaterialModule, MatSnackBarModule
  ],
  exports: [
    SnackBarComponent
  ],
  providers: [
    SnackBarComponent
  ]
})
export class SharedModule { }
