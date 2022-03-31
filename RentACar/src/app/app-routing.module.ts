import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableCarsDisplayComponent } from './available-cars-display/available-cars-display.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CurrentlyRentedVehicleComponent } from './currently-rented-vehicle/currently-rented-vehicle.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'user-profile',component : UserProfileComponent},
  { path: 'available-cars', component: AvailableCarsDisplayComponent },
  { path: 'rentedVehicle', component: CurrentlyRentedVehicleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
