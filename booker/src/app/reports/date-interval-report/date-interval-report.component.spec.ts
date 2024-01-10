import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateIntervalReportComponent } from './date-interval-report.component';

describe('DateIntervalReportComponent', () => {
  let component: DateIntervalReportComponent;
  let fixture: ComponentFixture<DateIntervalReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateIntervalReportComponent]
    });
    fixture = TestBed.createComponent(DateIntervalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
