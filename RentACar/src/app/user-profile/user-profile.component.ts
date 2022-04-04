import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../dto/user';
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
    this.grabUser().subscribe(data => {this.user = data;})
    
  }

  grabUser(): Observable<User> {
      let logovani = sessionStorage.getItem('token')
    return this.http.get<User>('http://localhost:8082/user/' + sessionStorage.getItem('username'));
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login'])

  }

  

}
