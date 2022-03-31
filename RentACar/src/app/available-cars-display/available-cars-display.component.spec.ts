import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCarsDisplayComponent } from './available-cars-display.component';

describe('AvailableCarsDisplayComponent', () => {
  let component: AvailableCarsDisplayComponent;
  let fixture: ComponentFixture<AvailableCarsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableCarsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableCarsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
