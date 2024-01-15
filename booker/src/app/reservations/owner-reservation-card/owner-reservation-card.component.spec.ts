import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerReservationCardComponent } from './owner-reservation-card.component';

describe('OwnerReservationCardComponent', () => {
  let component: OwnerReservationCardComponent;
  let fixture: ComponentFixture<OwnerReservationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerReservationCardComponent]
    });
    fixture = TestBed.createComponent(OwnerReservationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
