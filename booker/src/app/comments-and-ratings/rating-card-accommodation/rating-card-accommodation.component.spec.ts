import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingCardAccommodationComponent } from './rating-card-accommodation.component';

describe('RatingCardAccommodationComponent', () => {
  let component: RatingCardAccommodationComponent;
  let fixture: ComponentFixture<RatingCardAccommodationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingCardAccommodationComponent]
    });
    fixture = TestBed.createComponent(RatingCardAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
