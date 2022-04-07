import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentService } from '../service/rent.service';
import { } from 'googlemaps';
import { ViewChild } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { vehicleServiceApi } from '../app.consts';

@Component({
  selector: 'app-currently-rented-vehicle',
  templateUrl: './currently-rented-vehicle.component.html',
  styleUrls: ['./currently-rented-vehicle.component.css']
})
export class CurrentlyRentedVehicleComponent implements OnInit, AfterViewInit {

  @ViewChild('map') mapElement: any;
  map!: google.maps.Map;

  @ViewChild('mapModal') mapModalElement: any;
  mapModal!: google.maps.Map;

  constructor(private rentService: RentService, private router: Router, private toastr: ToastrService,) { }
  ngAfterViewInit(): void {
    this.initmap()
  }

  rentedVehicle: any;
  isModalActive = false;
  addresses: any;
  selectedAddress: any;
  modalMarker: any;

  public stompClient: any;

  ngOnInit(): void {
    if (sessionStorage.getItem('userId') == null) {
      this.router.navigate(['login'])
    }
    else {
      this.getRentedVehicle();
      this.getAllAddresses();
    }
  }
  initmap() {
    const mapProperties = {
      center: new google.maps.LatLng(45.251735, 19.837080),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.mapModal = new google.maps.Map(this.mapModalElement.nativeElement, mapProperties);
    this.createMarkers();
    this.createMarkerForSelectedAddress();
  }

  createMarkerForSelectedAddress() {
    if (this.modalMarker != null || this.modalMarker != undefined)
      this.modalMarker.setMap(null)
    this.modalMarker = null

    var address = this.addresses.filter((a: any) => a.id == this.selectedAddress)[0]
    var data = { lat: address.latitude, lng: address.longitude }

    this.modalMarker = new google.maps.Marker({
      position: data,
      map: this.mapModal
    })
  }

  createMarkers() {
    var data = { lat: this.rentedVehicle.latitude, lng: this.rentedVehicle.longitude }

    var marker = new google.maps.Marker({
      position: data,
      map: this.map
    })
  }
  getAllAddresses() {
    this.rentService.getAllGarages().subscribe(
      (data) => {
        this.addresses = data
      },
      (error) => {
        this.addresses = []
      }
    )
  }

  getRentedVehicle() {
    this.rentService.getCurrentlyRentedVehicleForUser(sessionStorage.getItem('userId')).subscribe(
      (data) => {
        this.rentedVehicle = data;
        let dateTime = this.rentedVehicle.startTime;
        this.rentedVehicle.startTime = new Date(dateTime[0], dateTime[1] - 1, dateTime[2], dateTime[3], dateTime[4]);
      },
      (error) => {
        //this.toastr.error(error.error.message);
        this.router.navigate(['available-cars']);
      }
    );
  }

  getCurrentDuration() {
    return Math.ceil((new Date().getTime() - this.rentedVehicle.startTime.getTime()) / (1000 * 3600 * 24));
  }

  getCurrentPrice() {
    return this.getCurrentDuration() * this.rentedVehicle.price
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive
  }

  finishRent() {
    if (this.selectedAddress == null || this.selectedAddress == undefined) {
      this.toastr.warning("Must select address")
      return;
    }
    this.rentService.finishRent({ rentId: this.rentedVehicle.rentId, addressId: this.selectedAddress }).subscribe(
      (data) => {
        this.connect();
        this.router.navigate(['available-cars']);
      },
      () => {
        this.toastr.error("Finishing rent goes wrong")
      }
    )
  }
  connect() {
    const socket = new SockJS(vehicleServiceApi + 'vehicle-socket-endpoint');
    this.stompClient = Stomp.over(function () {
      return socket
    });
    const _this = this;

    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);

      _this.stompClient.send(
        '/vehicle-socket/rent-change');
    });

  }

}
