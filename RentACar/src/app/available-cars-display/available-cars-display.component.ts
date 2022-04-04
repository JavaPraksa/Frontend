import { Component, OnInit } from '@angular/core';
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
  vehicles : Vehicle[] = [];
  
  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getAvailableVehicles().subscribe((data) => { this.vehicles = data; })
  }

}
