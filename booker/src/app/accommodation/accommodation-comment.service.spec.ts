import { TestBed } from '@angular/core/testing';

import { AccommodationCommentService } from './accommodation-comment.service';

describe('AccommodationCommentService', () => {
  let service: AccommodationCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
