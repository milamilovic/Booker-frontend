import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../user.service";
import {Guest} from "./model/guest.model";
import {UpdateUserDTO} from "../dto/UpdateUserDTO";

@Component({
  selector: 'app-guest-view',
  templateUrl: './guest-view.component.html',
  styleUrls: ['./guest-view.component.css']
})
export class GuestViewComponent implements OnInit{
  hide_new: boolean = true;
  hide_confirm : boolean = true;
  guest!: Guest;
  updateUser: UpdateUserDTO = {
    _id: 1
  };
  title: string = "";
  content: string = "";
  newPassword: string = '';
  confirmPassword: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getGuestById(1).subscribe({
      next: (result: Guest) => {
        this.guest = result;
        this.updateUser = {
          _id: 1,
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
    this.service.updateGuest(1, this.updateUser).subscribe((response) => {
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
    this.service.deleteGuest(1).subscribe(
      response => {
        if (!response) {
          this.openDialog("Deletion failed", "You can not delete your account " +
            "at the moment because you have active reservations in the future!\nSorry :(");
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
      dialogOverlayById.style.opacity = String(1);
    }
  }

  closeDialog(){
    const dialogOverlayById = document.getElementById('dialog-overlay');
    if (dialogOverlayById) {
      dialogOverlayById.style.opacity = String(0);
    }
  }
}
