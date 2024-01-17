import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerRatingsCardComponent } from './owner-ratings-card.component';

describe('OwnerRatingsCardComponent', () => {
  let component: OwnerRatingsCardComponent;
  let fixture: ComponentFixture<OwnerRatingsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerRatingsCardComponent]
    });
    fixture = TestBed.createComponent(OwnerRatingsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
