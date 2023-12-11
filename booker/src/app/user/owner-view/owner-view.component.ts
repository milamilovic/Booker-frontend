import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UpdateUserDTO} from "../dto/UpdateUserDTO";
import {Owner} from "./model/owner.model";
import {UserService} from "../user.service";

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
    _id: 1
  };
  newPassword: string = '';
  confirmPassword: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private service: UserService) { }

  ngOnInit(): void {
      this.service.getOwnerById(1).subscribe({
          next: (result: Owner) => {
              this.owner = result;
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
    this.service.updateOwner(1, this.updateUser).subscribe((response) => {
      console.log('Updated user data!', response);
    });
  }

  applyChanges() {
    if (this.newPassword === this.confirmPassword) {
      this.saveChanges();
    } else {
      // TODO error with password
      console.log('Passwords must be the same!');
    }
  }

  deleteAccount() {
    // TODO delete acc
  }

}
