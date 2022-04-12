import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditVehiclesComponent } from './admin-edit-vehicles.component';

describe('AdminEditVehiclesComponent', () => {
  let component: AdminEditVehiclesComponent;
  let fixture: ComponentFixture<AdminEditVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditVehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
