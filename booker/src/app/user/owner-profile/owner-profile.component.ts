import {Component, OnInit} from '@angular/core';
import {Owner} from "../owner-view/model/owner.model";
import {UserService} from "../user.service";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {AccommodationViewDto} from "../../accommodation/accommodation/model/accommodation-view";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {OwnerCommentService} from "../owner-comment.service";
import {SnackBarComponent} from "../../shared/snack-bar/snack-bar.component";
import {CreateOwnerCommentDTO} from "../dto/CreateOwnerCommentDTO";

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}


@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.css']
})


export class OwnerProfileComponent implements OnInit{
  owner! : Owner;
  accommodationId : number = 0;
  ownerId : number = 0;
  submitted: boolean = false;
  notification!: DisplayMessage;
  returnUrl!: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  add_comment_form = new FormGroup({
    content: new FormControl('')
  });

  constructor(private AccommodationService: AccommodationService,
              private service : UserService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private ownerCommentService: OwnerCommentService,
              private snackBar : SnackBarComponent) { }

  constructor(private AccommodationService: AccommodationService,
              private service : UserService) { }
  ngOnInit(): void {
    this.accommodationId = Number(localStorage.getItem("accommodationId"));
    this.AccommodationService.getAccommodation(this.accommodationId).subscribe({
      next: (result: AccommodationViewDto) => {
        this.ownerId = result.owner_id;
        console.log(this.ownerId);
        console.log(result);
        this.service.getOwnerById(this.ownerId).subscribe({
          next: (result: Owner) =>{
            this.owner = result;
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  report():void{

  }


  openSnackBar(message: string, action: string) {
    this.snackBar.openSnackBar(message, action);
  }

  submitForm() {
    const ownerComment: CreateOwnerCommentDTO = {
      ownerId: this.ownerId,
      guestId: Number(localStorage.getItem('loggedId')),
      content: this.add_comment_form.value.content!,
    };

    this.ownerCommentService.add(ownerComment).subscribe(
      (response) => {
        console.log("Owner comment successfully added!", response);
        this.openSnackBar("Sucess!", "Close");
      },
      (error) => {
        console.error("Error in creating owner comment: ", error);
        this.openSnackBar("Error!", "Close");
      }
    )
  }

}
