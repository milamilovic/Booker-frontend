import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccommodationService} from "../accommodation.service";
import {SnackBarComponent} from "../../shared/snack-bar/snack-bar.component";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, map, of, Subject, takeUntil} from "rxjs";

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
  id!: number;
  submitted: boolean = false;
  notification!: DisplayMessage;
  returnUrl!: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  form = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    amount: new FormControl(),
    price_type: new FormControl(),
    deadline: new FormControl()
  });

  constructor(private accommodationService: AccommodationService,
              private snackBarComponent: SnackBarComponent,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: any) => {
        this.notification = params as DisplayMessage;
      });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.form = this.formBuilder.group({
      startDate: [],
      endDate: [],
      amount: [],
      price_type: [],
      deadline: []
      //profilePicture: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit(): void {
    this.notification;
    this.submitted = true;
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.accommodationService.updateAvailability(this.id,this.form.value)
      .pipe(
        map(data => {
          console.log(data);
          // Transform the data if needed
          return data;
        }),
        catchError(error => {
          console.log(error);
          this.submitted = false;
          this.notification = {msgType: 'error', msgBody: 'Incorrect username or password.'};
          // Returning an observable here if you want to continue the error flow
          // return throwError('Custom error message');
          // or just returning an empty observable to complete the observable chain
          return of();
        })
      )
      .subscribe(data => {
        // Handle the transformed data or side effects
        //this.userService.getMyInfo().subscribe();
        this.router.navigate([this.returnUrl]);
      });
  }

}
