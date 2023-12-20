import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAvailabilityComponent } from './update-availability.component';

describe('UpdateAvailabilityComponent', () => {
  let component: UpdateAvailabilityComponent;
  let fixture: ComponentFixture<UpdateAvailabilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAvailabilityComponent]
    });
    fixture = TestBed.createComponent(UpdateAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
