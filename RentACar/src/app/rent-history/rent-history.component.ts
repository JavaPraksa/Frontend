import { Component, OnInit } from '@angular/core';
import { RentService } from '../service/rent.service';
import { Rent } from './Rent';

@Component({
  selector: 'app-rent-history',
  templateUrl: './rent-history.component.html',
  styleUrls: ['./rent-history.component.css']
})
export class RentHistoryComponent implements OnInit {
  rents: Rent[] = [];

  constructor(private rentService: RentService) { }
  
  ngOnInit(): void {
    this.rentService.getRentHistory(sessionStorage.getItem('userId')).subscribe(
      (data) => {
        this.rents = data;
      }
    );
  }

}
