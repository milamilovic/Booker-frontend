import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserType} from "../../enums/user-type.enum";
import {UserService} from "../../user.service";
import {User} from "../../user/model/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('',Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    type: new FormControl(UserType.Guest, Validators.required)
  });

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  create(): void {
    if (this.registerForm.valid) {
      const user: User = {
        _id: Math.random(),
        name: this.registerForm.value.name ?? '',
        surname: this.registerForm.value.surname ?? '',
        email: this.registerForm.value.email ?? '',
        address: this.registerForm.value.address ?? '',
        phone: this.registerForm.value.phone ?? '',
        password: this.registerForm.value.password ?? '',
        type: this.registerForm.value.type ?? UserType.Guest
      };
      this.userService.add(user);
    }
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  register() {
    if(this.registerForm.valid) {
      console.log("Register successful")
    } else {
      console.log("Invalid form")
    }
  }

}
