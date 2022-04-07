import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RentService } from '../service/rent.service';
import { VehicleService } from '../service/vehicle.service';
import { Address } from './Address';
import { Vehicle } from './Vehicle';
import { } from 'googlemaps';
import { ViewChild } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { vehicleServiceApi } from '../app.consts';

@Component({
  selector: 'app-available-cars-display',
  templateUrl: './available-cars-display.component.html',
  styleUrls: ['./available-cars-display.component.css']
})
export class AvailableCarsDisplayComponent implements OnInit, AfterViewInit {

  public searchText: string = "";
  vehicles: Vehicle[] = [];
  address: Address = { country: "", houseNumber: "", latitude: 0, longitude: 0, street: "", town: "" };
  selectedVehicle: Vehicle = { id: 0, model: '', details: '', price: 0, address: this.address };
  marksers: google.maps.Marker[] = [];

  isModalActive = false;

  @ViewChild('map') mapElement: any;
  map!: google.maps.Map;

  public stompClient: any;

  constructor(private vehicleService: VehicleService, private rentService: RentService, private router: Router) { }

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
    this.connect()
  }

  connect() {
    const socket = new SockJS(vehicleServiceApi + 'vehicle-socket-endpoint');
    this.stompClient = Stomp.over(function () {
      return socket
    });
    const _this = this;

    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/vehicle-socket/available-vehicles', function (data: any) {
        _this.vehicles = JSON.parse(data.body).body;
        _this.createMarkers();
      });
    });

  }

  rented() {
    this.stompClient.send(
      '/vehicle-socket/rent-change');
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
    for (var marker of this.marksers) {
      marker.setMap(null)
    }
    this.marksers = [];

    for (const vehicle of this.vehicles) {
      var data = { lat: vehicle.address.latitude, lng: vehicle.address.longitude }

      this.marksers.push(new google.maps.Marker({
        position: data,
        map: this.map,
        title: vehicle.address.street,
        label: this.vehicles.filter((v) => v.address.latitude == data.lat && v.address.longitude == data.lng).length.toString()
      }))
    }
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive
  }

  showVehicle(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
    this.isModalActive = true;
  }

  rentVehicle(vehicleId: number) {
    var isSuccess = false;
    this.rentService.startRent(vehicleId).subscribe((data) => {
      this.rented();
      isSuccess = data;
      this.router.navigate(['rented-vehicle']);
    });

  }



}
