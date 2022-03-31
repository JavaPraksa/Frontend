import { Component, OnInit } from '@angular/core';
import { Address } from './Address';
import { Vehicle } from './Vehicle';

@Component({
  selector: 'app-available-cars-display',
  templateUrl: './available-cars-display.component.html',
  styleUrls: ['./available-cars-display.component.css']
})
export class AvailableCarsDisplayComponent implements OnInit {

  public searchText: string = "";

  address: Address = {street: "Street Name", houseNumber:"45", town: "Town", country: "Country", longitude: 15215, latitude: 6452545};
  address1: Address = {street: "Trala Name", houseNumber:"45", town: "City", country: "State", longitude: 15215, latitude: 6452545};
  vehicles : Vehicle[] = [
    {model: "Car 1", details: 'Details 1', price: 10, address:this.address},
    {model: "Car 2", details: 'Details 2', price: 11, address:this.address},
    {model: "Car 3", details: 'Details 3', price: 18, address:this.address1},
    {model: "Car 4", details: 'Details 4', price: 14, address:this.address},
    {model: "Car 5", details: 'Details 5', price: 16, address:this.address},
    {model: "Car 6", details: 'Details 6', price: 15, address:this.address1},
    {model: "Car 7", details: 'Details 7', price: 10, address:this.address1},
    {model: "Car 8", details: 'Details 8', price: 13, address:this.address},
    {model: "Car 9", details: 'Details 9', price: 12, address:this.address1},
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
