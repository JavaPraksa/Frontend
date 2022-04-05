import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vehicleServiceApi } from '../app.consts';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private http: HttpClient) { }

  getCurrentlyRentedVehicleForUser(userId: any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${sessionStorage.getItem('token')}`)
    }
    return this.http.get(vehicleServiceApi + 'rent/currently-rented-vehicle?clientId=' + userId, header)
  }

  getAllGarages() {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${sessionStorage.getItem('token')}`)
    }
    return this.http.get(vehicleServiceApi + 'rent/garages', header)
  }

  finishRent(finishRent: any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${sessionStorage.getItem('token')}`)
    }
    return this.http.put<any>(vehicleServiceApi + 'rent/finish', finishRent, header)
  }

  startRent(vid: number) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `${sessionStorage.getItem('token')}`)
    }
    var userId = sessionStorage.getItem('userId');
    return this.http.post<any>(vehicleServiceApi + 'rent/new', {clientId: userId, vehicleId: vid}, header);
  }
}
