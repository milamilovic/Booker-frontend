import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestViewComponent } from './guest-view.component';

describe('GuestViewComponent', () => {
  let component: GuestViewComponent;
  let fixture: ComponentFixture<GuestViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestViewComponent]
    });
    fixture = TestBed.createComponent(GuestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
