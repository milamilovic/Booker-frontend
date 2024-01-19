import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingCardComponent } from './reporting-card.component';

describe('ReportingCardComponent', () => {
  let component: ReportingCardComponent;
  let fixture: ComponentFixture<ReportingCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportingCardComponent]
    });
    fixture = TestBed.createComponent(ReportingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
