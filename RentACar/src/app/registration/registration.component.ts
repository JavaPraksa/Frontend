import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from './User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private _snackBar: MatSnackBar) { }

  user = new User("", "", "", "", "", "")

  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required, this.equalsToPasswordValidator()]);

  equalsToPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      control.value?.toLowerCase() == this.user.password ? null : { wrongColor: control.value };
  }

  ngOnInit(): void {
  }

  register(): void {
    this.userService.register(this.user).subscribe(
      (data: any)=>{
        this.router.navigate(['login'])
      },
      (error: any)=>{
        console.log(error)
        this._snackBar.open(error.error.message, 'X', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    )
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' :
        '';
  }
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' :
        '';
  }
  getConfirmPassErrorMessage() {
    return this.confirmPassword.hasError('required') ? 'You must enter a value' :
        'Passwords must match';
  }

}
