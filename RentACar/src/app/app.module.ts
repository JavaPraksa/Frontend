import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { AvailableCarsDisplayComponent } from './available-cars-display/available-cars-display.component';
import { CurrentlyRentedVehicleComponent } from './currently-rented-vehicle/currently-rented-vehicle.component';
import { RentHistoryComponent } from './rent-history/rent-history.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,
    UserProfileComponent,
    AvailableCarsDisplayComponent,
    CurrentlyRentedVehicleComponent,
    RentHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule,
    RouterModule.forRoot([
      {path: 'user-profile', component: UserProfileComponent},
    ]),
    MatSnackBarModule,
    ToastrModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
