
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { profile } from 'console';
import { userServiceApi } from '../app.consts';
import { LoginUser } from '../login/LoginUser';
import { User } from '../registration/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  
  login(loginUser: LoginUser) {
    return this.http.post(userServiceApi + 'auth/login', loginUser)
  }

  register(user: User) {
    return this.http.post(userServiceApi + 'user/register', user)
  }     

  grabUser(): Observable<User> {
    return this.http.get<User>('http://localhost:8082/user/' + sessionStorage.getItem('username'));
  }
  
}
