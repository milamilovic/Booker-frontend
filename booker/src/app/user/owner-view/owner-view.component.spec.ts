import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerViewComponent } from './owner-view.component';

describe('OwnerViewComponent', () => {
  let component: OwnerViewComponent;
  let fixture: ComponentFixture<OwnerViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerViewComponent]
    });
    fixture = TestBed.createComponent(OwnerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
