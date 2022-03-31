import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentlyRentedVehicleComponent } from './currently-rented-vehicle.component';

describe('CurrentlyRentedVehicleComponent', () => {
  let component: CurrentlyRentedVehicleComponent;
  let fixture: ComponentFixture<CurrentlyRentedVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentlyRentedVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentlyRentedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
