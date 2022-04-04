import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../service/vehicle.service';
import { Address } from './Address';
import { Vehicle } from './Vehicle';
import { } from 'googlemaps';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-available-cars-display',
  templateUrl: './available-cars-display.component.html',
  styleUrls: ['./available-cars-display.component.css']
})
export class AvailableCarsDisplayComponent implements OnInit, AfterViewInit {

  public searchText: string = "";
  vehicles: Vehicle[] = [];

  @ViewChild('map') mapElement: any;
  map!: google.maps.Map;

  constructor(private vehicleService: VehicleService, private router: Router) { }

  ngAfterViewInit(): void {
    this.initmap()
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('userId') == null) {
      this.router.navigate(['login'])
    }
    this.vehicleService.getAvailableVehicles().subscribe((data) => {
      this.vehicles = data;
      this.createMarkers();
    },
      (error) => {
        this.router.navigate(['login']);
      })
  }
  initmap() {
    const mapProperties = {
      center: new google.maps.LatLng(45.251735, 19.837080),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }
  createMarkers() {
    for(const vehicle of this.vehicles){
      var data = {lat: vehicle.address.latitude, lng: vehicle.address.longitude}

      var marker = new google.maps.Marker({
        position: data,
        map: this.map,
        title: vehicle.address.street,
        label: this.vehicles.filter((v) => v.address.latitude == data.lat && v.address.longitude == data.lng).length.toString()
      })
    }
  }

}
