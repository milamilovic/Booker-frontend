import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAccommodationListingComponent } from './owner-accommodation-listing.component';

describe('OwnerAccommodationListingComponent', () => {
  let component: OwnerAccommodationListingComponent;
  let fixture: ComponentFixture<OwnerAccommodationListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerAccommodationListingComponent]
    });
    fixture = TestBed.createComponent(OwnerAccommodationListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
