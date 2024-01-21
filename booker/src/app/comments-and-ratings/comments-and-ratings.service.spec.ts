import { TestBed } from '@angular/core/testing';

import { CommentsAndRatingsService } from './comments-and-ratings.service';

describe('CommentsAndRatingsService', () => {
  let service: CommentsAndRatingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsAndRatingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
