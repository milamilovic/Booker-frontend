import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAccommodationCardComponent } from './approve-accommodation-card.component';

describe('ApproveAccommodationCardComponent', () => {
  let component: ApproveAccommodationCardComponent;
  let fixture: ComponentFixture<ApproveAccommodationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveAccommodationCardComponent]
    });
    fixture = TestBed.createComponent(ApproveAccommodationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
