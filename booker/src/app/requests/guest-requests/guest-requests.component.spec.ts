import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRequestsComponent } from './guest-requests.component';

describe('GuestRequestsComponent', () => {
  let component: GuestRequestsComponent;
  let fixture: ComponentFixture<GuestRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestRequestsComponent]
    });
    fixture = TestBed.createComponent(GuestRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
