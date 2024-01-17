import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCardAccommodationComponent } from './comment-card-accommodation.component';

describe('CommentCardAccommodationComponent', () => {
  let component: CommentCardAccommodationComponent;
  let fixture: ComponentFixture<CommentCardAccommodationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentCardAccommodationComponent]
    });
    fixture = TestBed.createComponent(CommentCardAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
