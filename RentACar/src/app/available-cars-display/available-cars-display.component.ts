import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../service/vehicle.service';
import { Address } from './Address';
import { Vehicle } from './Vehicle';

@Component({
  selector: 'app-available-cars-display',
  templateUrl: './available-cars-display.component.html',
  styleUrls: ['./available-cars-display.component.css']
})
export class AvailableCarsDisplayComponent implements OnInit {

  public searchText: string = "";
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('userId') == null) {
      this.router.navigate(['login'])
    }
    this.vehicleService.getAvailableVehicles().subscribe((data) => { this.vehicles = data; },
      (error) => {
        this.router.navigate(['login']);
      })
  }

}
