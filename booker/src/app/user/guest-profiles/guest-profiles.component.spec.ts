import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestProfilesComponent } from './guest-profiles.component';

describe('GuestProfilesComponent', () => {
  let component: GuestProfilesComponent;
  let fixture: ComponentFixture<GuestProfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestProfilesComponent]
    });
    fixture = TestBed.createComponent(GuestProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
