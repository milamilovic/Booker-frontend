import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationReportComponent } from './accommodation-report.component';

describe('AccommodationReportComponent', () => {
  let component: AccommodationReportComponent;
  let fixture: ComponentFixture<AccommodationReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationReportComponent]
    });
    fixture = TestBed.createComponent(AccommodationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
