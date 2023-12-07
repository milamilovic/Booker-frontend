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
  updateUser!: UpdateUserDTO;
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
    // TODO load profile pic path
    // this.updateUser.profilePicture.path = 'new_path';
  }

  saveChanges(): void {
    this.service.updateUser(1, this.updateUser).subscribe((response) => {
      console.log('Updated user data!', response);
    });
  }

  applyChanges() {
    if (this.newPassword === this.confirmPassword) {
      this.saveChanges();
    } else {
      // TODO error with password
    }
  }

  deleteAccount() {
    // TODO delete acc
  }

}
