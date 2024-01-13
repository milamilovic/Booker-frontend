import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccommodationService} from "../accommodation.service";
import {SnackBarComponent} from "../../shared/snack-bar/snack-bar.component";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, map, of, Subject, takeUntil} from "rxjs";
import {Price} from "../accommodation/model/price.model";
import {PriceType} from "../../enums/price-type.enum";
import {UpdateAvailabilityDTO} from "./model/UpdateAvailabilityDTO";
import {HttpClient} from "@angular/common/http";

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}

@Component({
  selector: 'app-update-availability',
  templateUrl: './update-availability.component.html',
  styleUrls: ['./update-availability.component.css']
})
export class UpdateAvailabilityComponent implements OnInit{
  formGroupAvailability = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl('')
  })

  formGroupPrice = new FormGroup({
    priceStartDate: new FormControl(),
    priceEndDate: new FormControl(),
    amount: new FormControl(100.0, [Validators.required]),
    price_type: new FormControl('PER_GUEST', [Validators.required])
  })

  formGroupDeadline = new FormGroup({
    deadline: new FormControl(1, [Validators.required])
  })

  constructor(private http: HttpClient,
              private snackBar: SnackBarComponent,
              private accommodationService: AccommodationService) {
  }
  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openSnackBar(message, action);
  }

  submitForm() {
    const price: Price = {
      cost: this.formGroupPrice.value.amount!,
      fromDate: this.formGroupPrice.value.priceStartDate,
      toDate: this.formGroupPrice.value.priceEndDate,
      type: (this.formGroupPrice.value.price_type === "PER_ACCOMMODATION") ? PriceType.PER_ACCOMMODATION : PriceType.PER_GUEST,
    };

    const updateAvailability: UpdateAvailabilityDTO = {
      startDate: this.formGroupAvailability.value.startDate!,
      endDate: this.formGroupAvailability.value.endDate!,
      price: price,
      deadline: this.formGroupDeadline.value.deadline!
    }

    const accommodationId = Number(localStorage.getItem("accommodationId"));

    this.accommodationService.updateAvailability(accommodationId, updateAvailability).subscribe(
      (response) => {
        console.log("Successfully updated: ", response);
        //this.uploadPhotos(response.id!);
        this.openSnackBar("Success!", "Close");

      },
      (error) => {
        console.error("Error in updating availability: ", error);
        this.openSnackBar("Error updating availability", "Close");
      }
    )



  }


}
