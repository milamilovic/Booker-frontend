import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationRatingsCardComponent } from './accommodation-ratings-card.component';

describe('AccommodationRatingsCardComponent', () => {
  let component: AccommodationRatingsCardComponent;
  let fixture: ComponentFixture<AccommodationRatingsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationRatingsCardComponent]
    });
    fixture = TestBed.createComponent(AccommodationRatingsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
