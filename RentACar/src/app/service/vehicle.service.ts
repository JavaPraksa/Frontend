import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { vehicleServiceApi } from '../app.consts';
import { Vehicle } from '../available-cars-display/Vehicle';
import { VehicleFromDto} from '../dto/VehicleFromDto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseURL = "http://localhost:8081/vehicle";
  constructor(private http: HttpClient) { }

  getAvailableVehicles(): Observable<Vehicle[]> {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${sessionStorage.getItem('token')}`)
    }
    return this.http.get<Vehicle[]>(vehicleServiceApi + 'vehicle/available-vehicles', header)
  }

  getAvailableVehiclesDTO(): Observable<VehicleFromDto[]> {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${sessionStorage.getItem('token')}`)
    }
    return this.http.get<VehicleFromDto[]>(vehicleServiceApi + 'vehicle/available-vehicles', header)
  }



  getVehicleById(id : number) : Observable<VehicleFromDto> {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${sessionStorage.getItem('token')}`)
    }
    return this.http.get<VehicleFromDto>(`${this.baseURL}/${id}`, header)

  }
}
