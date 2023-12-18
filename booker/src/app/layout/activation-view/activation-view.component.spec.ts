import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationViewComponent } from './activation-view.component';

describe('ActivationViewComponent', () => {
  let component: ActivationViewComponent;
  let fixture: ComponentFixture<ActivationViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationViewComponent]
    });
    fixture = TestBed.createComponent(ActivationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
