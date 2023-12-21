import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAccommodationComponent } from './approve-accommodation.component';

describe('ApproveAccommodationComponent', () => {
  let component: ApproveAccommodationComponent;
  let fixture: ComponentFixture<ApproveAccommodationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveAccommodationComponent]
    });
    fixture = TestBed.createComponent(ApproveAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
