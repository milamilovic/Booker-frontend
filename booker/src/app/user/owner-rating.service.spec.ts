import { TestBed } from '@angular/core/testing';

import { OwnerRatingService } from './owner-rating.service';

describe('OwnerRatingService', () => {
  let service: OwnerRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
