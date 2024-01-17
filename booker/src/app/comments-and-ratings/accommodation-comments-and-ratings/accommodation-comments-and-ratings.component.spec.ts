import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationCommentsAndRatingsComponent } from './accommodation-comments-and-ratings.component';

describe('AccommodationCommentsAndRatingsComponent', () => {
  let component: AccommodationCommentsAndRatingsComponent;
  let fixture: ComponentFixture<AccommodationCommentsAndRatingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationCommentsAndRatingsComponent]
    });
    fixture = TestBed.createComponent(AccommodationCommentsAndRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
