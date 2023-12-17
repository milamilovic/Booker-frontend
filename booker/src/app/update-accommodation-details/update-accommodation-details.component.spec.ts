import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAccommodationDetailsComponent } from './update-accommodation-details.component';

describe('UpdateAccommodationDetailsComponent', () => {
  let component: UpdateAccommodationDetailsComponent;
  let fixture: ComponentFixture<UpdateAccommodationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAccommodationDetailsComponent]
    });
    fixture = TestBed.createComponent(UpdateAccommodationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
