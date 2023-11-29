import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationListingComponent } from './accommodation-listing.component';

describe('AccommodationListingComponent', () => {
  let component: AccommodationListingComponent;
  let fixture: ComponentFixture<AccommodationListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationListingComponent]
    });
    fixture = TestBed.createComponent(AccommodationListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
