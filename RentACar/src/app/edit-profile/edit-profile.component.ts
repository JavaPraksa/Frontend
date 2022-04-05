import { Component, OnInit } from '@angular/core';
import {User} from '../registration/User';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public user !: User;
  constructor(private http:HttpClient,private userService:UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  private username !: String;
  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    this.userService.grabUser().subscribe(data=> {
      this.user=data;
    })
  }
   onSubmit() {
     this.userService.editUser(this.username,this.user).subscribe(data=> {
       this.goToUserProfile();
     });
     
   }

   goToUserProfile() {
     this.router.navigate(['/user-profile']);
   }


  
}
