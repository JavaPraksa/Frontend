import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentService } from '../service/rent.service';

@Component({
  selector: 'app-currently-rented-vehicle',
  templateUrl: './currently-rented-vehicle.component.html',
  styleUrls: ['./currently-rented-vehicle.component.css']
})
export class CurrentlyRentedVehicleComponent implements OnInit {

  constructor(private rentService: RentService, private router: Router, private toastr: ToastrService,) { }

  rentedVehicle: any;
  isModalActive = false;
  addresses: any;
  selectedAddress: any;

  ngOnInit(): void {
    if (sessionStorage.getItem('userId') == null) {
      this.router.navigate(['login'])
    }
    else {
      this.getRentedVehicle();
      this.getAllAddresses();
    }
  }
  getAllAddresses() {
    this.rentService.getAllGarages().subscribe(
      (data)=>{
        this.addresses = data
      },
      (error)=>{
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

  getCurrentDuration(){
    return Math.ceil((new Date().getTime() - this.rentedVehicle.startTime.getTime())/ (1000 * 3600 * 24));
  }

  getCurrentPrice(){
    return this.getCurrentDuration() * this.rentedVehicle.price
  }

  toggleModal(){
    this.isModalActive = !this.isModalActive
  }

  finishRent(){
    if(this.selectedAddress == null || this.selectedAddress == undefined){
      this.toastr.warning("Must select address")
      return;
    }
    this.rentService.finishRent({rentId: this.rentedVehicle.rentId, addressId: this.selectedAddress}).subscribe(
      (data)=>{
        this.router.navigate(['available-cars']);
      },
      ()=>{
        this.toastr.error("Finishing rent goes wrong")
      }
    )
  }
}
