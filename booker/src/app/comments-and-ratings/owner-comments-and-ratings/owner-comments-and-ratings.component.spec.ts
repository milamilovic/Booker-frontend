import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCommentsAndRatingsComponent } from './owner-comments-and-ratings.component';

describe('OwnerCommentsAndRatingsComponent', () => {
  let component: OwnerCommentsAndRatingsComponent;
  let fixture: ComponentFixture<OwnerCommentsAndRatingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerCommentsAndRatingsComponent]
    });
    fixture = TestBed.createComponent(OwnerCommentsAndRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
