import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationCommentsCardComponent } from './accommodation-comments-card.component';

describe('AccommodationCommentsCardComponent', () => {
  let component: AccommodationCommentsCardComponent;
  let fixture: ComponentFixture<AccommodationCommentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationCommentsCardComponent]
    });
    fixture = TestBed.createComponent(AccommodationCommentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
