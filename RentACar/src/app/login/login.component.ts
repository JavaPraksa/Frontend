import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { LoginUser } from './LoginUser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private _snackBar: MatSnackBar) { }

  loginUser = new LoginUser("", "")

  ngOnInit(): void {
  }

  login(): void{
    this.userService.login(this.loginUser).subscribe(
      (data : any)=>{
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('role', data.role)
        sessionStorage.setItem('username', data.username)
        this.redirectUser(data.role);
      },
      (error)=>{
        console.log(error)
        this._snackBar.open(error.error.message, 'X', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    )
  }

  redirectUser(role: any) {
    //TODO: add url
    if(role == "ADMIN"){
      this.router.navigate([''])
    }
    else{
      this.router.navigate([''])
    }
  }

}
