import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../registration/User';
import { userServiceApi } from '../app.consts';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { LoginUser } from '../login/LoginUser';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user !: User
 
  loginUser = new LoginUser("", "")


  constructor(private http: HttpClient,private userService: UserService,private router : Router) { }


  ngOnInit(): void {
    this.userService.grabUser().subscribe(data=>{this.user=data;})
  }


  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login'])

  }

  

}
