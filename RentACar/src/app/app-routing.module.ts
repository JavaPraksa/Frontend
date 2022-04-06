import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableCarsDisplayComponent } from './available-cars-display/available-cars-display.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CurrentlyRentedVehicleComponent } from './currently-rented-vehicle/currently-rented-vehicle.component';
import { RentHistoryComponent } from './rent-history/rent-history.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'user-profile',component : UserProfileComponent},
  { path: 'available-cars', component: AvailableCarsDisplayComponent },
  {path: 'edit-profile/:username',component:EditProfileComponent},
  { path: 'rented-vehicle', component: CurrentlyRentedVehicleComponent },
  { path: 'rent-history', component: RentHistoryComponent },
  { path: '', pathMatch: 'full', redirectTo: 'rented-vehicle' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
