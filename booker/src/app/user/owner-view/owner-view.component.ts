import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UpdateUserDTO} from "../dto/UpdateUserDTO";
import {Owner} from "./model/owner.model";
import {UserService} from "../user.service";
import {OwnerCommentDTO} from "../dto/OwnerCommentDTO";
import {OwnerCommentService} from "../owner-comment.service";

@Component({
  selector: 'app-owner-view',
  templateUrl: './owner-view.component.html',
  styleUrls: ['./owner-view.component.css']
})
export class OwnerViewComponent implements OnInit{
  hide_new: boolean = true;
  hide_confirm : boolean = true;
  owner!: Owner;
  updateUser: UpdateUserDTO = {
    _id: 6
  };
  title: string = "";
  content: string = "";
  newPassword: string = '';
  confirmPassword: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef;
  loggedIn : number = 0;
  ownerComments: OwnerCommentDTO[] = [];
  isReportClicked = false;
  averageRating: number = 0;

  constructor(private service: UserService,
              private ownerCommentService: OwnerCommentService) { }

  ngOnInit(): void {
    this.loggedIn = Number(localStorage.getItem("loggedId"));
      this.service.getOwnerById(this.loggedIn).subscribe({
          next: (result: Owner) => {
              this.owner = result;
              this.updateUser = {
                  _id: this.loggedIn,
                  name: result.name,
                  surname: result.surname,
                  email: result.email,
                  address: result.address,
                  phone: result.phone,
                  password: result.password,
                  profilePicture: result.profilePicture
              };
          },
          error: (err: any) => {
              console.log(err);
          }
      })
    this.loadOwnerComments();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      // @ts-ignore
      this.updateUser.profilePicture.path = e.target.result;
    };
    reader.readAsDataURL(file);
    // @ts-ignore
    console.log(this.updateUser.profilePicture.path);
  }

  saveChanges(): void {
    this.service.updateOwner(this.loggedIn, this.updateUser).subscribe((response) => {
      console.log('Updated user data!', response);
    });
  }

  applyChanges() {
    if (this.newPassword === this.confirmPassword) {
      this.saveChanges();
    } else {
      this.openDialog("Password error", "Passwords must be the same!");
      console.log('Passwords must be the same!');
    }
  }

  deleteAccount() {
    this.service.deleteOwner(this.loggedIn).subscribe(
      response => {
        if (!response.body) {
          this.openDialog("Deletion failed", "You can not delete your account " +
            "at the moment because you have active reservations for your accommodation in the future!\nSorry :(");
        } else {
          this.openDialog("Deletion successful", "Deleted account! ");
        }
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  openDialog(title: String, content: String) {
    // @ts-ignore
    this.title = title;
    // @ts-ignore
    this.content = content;
    const dialogOverlayById = document.getElementById('dialog-overlay');
    if (dialogOverlayById) {
      dialogOverlayById.style.display = "flex";
    }
  }

  closeDialog(){
    const dialogOverlayById = document.getElementById('dialog-overlay');
    if (dialogOverlayById) {
      dialogOverlayById.style.display = "none";
    }
  }

  loadOwnerComments(): void {
    this.ownerCommentService.findAllNotDeletedForOwner(this.loggedIn).subscribe(
      (response) => {
        this.ownerComments = response;
        this.calculateOwnerRate();
        console.log("Owner comments successfully loaded!", response);
      },
      (error) => {
        console.log("Error in loading owner comments!");
      }
    );
  }


  calculateOwnerRate() {
    let totalRatings: number = 0;
    let numberOfComments: number = this.ownerComments.length;
    for (const comment of this.ownerComments) {
      totalRatings += comment.rating;
    }
    this.averageRating = totalRatings / numberOfComments;
  }

}
