import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { vehicleServiceApi } from '../app.consts';
import { Vehicle } from '../available-cars-display/Vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getAvailableVehicles(): Observable<Vehicle[]> {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${sessionStorage.getItem('token')}`)
    }
    return this.http.get<Vehicle[]>(vehicleServiceApi + 'vehicle/available-vehicles', header)
  }
}
