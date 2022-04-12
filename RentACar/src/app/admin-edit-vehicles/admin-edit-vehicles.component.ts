import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from '../available-cars-display/Vehicle';
import { VehicleFromDto } from '../dto/VehicleFromDto';
import { UserService } from '../service/user.service';
import { VehicleService } from '../service/vehicle.service';

@Component({
  selector: 'app-admin-edit-vehicles',
  templateUrl: './admin-edit-vehicles.component.html',
  styleUrls: ['./admin-edit-vehicles.component.css']
})
export class AdminEditVehiclesComponent implements OnInit {

  constructor(private router: Router, private userService: UserService,private vehicleService: VehicleService) { }

  public searchText: string = "";
  vehiclesFromDto: VehicleFromDto[] = [];

  ngOnInit(): void {
    if (sessionStorage.getItem('userId') == null) {
      this.router.navigate(['login'])
    }
    this.vehicleService.getAvailableVehiclesDTO().subscribe((data) => {
      this.vehiclesFromDto = data;
     
    },
      (error) => {
        this.router.navigate(['login']);
      })
  }
  
  editVehicle(id: number) {
    this.router.navigate(['edit-vehicle',id]);
  }
  logout() {
    this.userService.logout().subscribe(
      ()=>{
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('role')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('userId')
        this.router.navigate(['login'])
      }
    )
  }

}
