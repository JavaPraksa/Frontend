import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleFromDto } from '../dto/VehicleFromDto';
import { VehicleService } from '../service/vehicle.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {

  id !: number;
  vehiclefromDto: VehicleFromDto = new VehicleFromDto();
  constructor(private http:HttpClient,private vehicleService:VehicleService,
    private router: Router,
    private route: ActivatedRoute) { }

    
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.vehicleService.getVehicleById(this.id).subscribe(data=>
      {
        this.vehiclefromDto =data;
      });
  }

  cancel() {
    this.router.navigate(['admin-edit-vehicles']);
  }

}
