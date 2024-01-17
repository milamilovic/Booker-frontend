import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCommentsCardComponent } from './owner-comments-card.component';

describe('OwnerCommentsCardComponent', () => {
  let component: OwnerCommentsCardComponent;
  let fixture: ComponentFixture<OwnerCommentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerCommentsCardComponent]
    });
    fixture = TestBed.createComponent(OwnerCommentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
