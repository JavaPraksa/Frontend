
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userServiceApi } from '../app.consts';
import { LoginUser } from '../login/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  
  login(loginUser: LoginUser) {
    return this.http.post(userServiceApi + 'auth/login', loginUser)
  }
}
