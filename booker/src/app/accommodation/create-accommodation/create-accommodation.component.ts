import {AfterViewInit, Component, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {MatDateRangePicker} from "@angular/material/datepicker";
import {FormBuilder, Validators} from "@angular/forms";
import {MapComponent} from "../../map/map.component";

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css'],

})
export class CreateAccommodationComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder : FormBuilder) {
  }
}



