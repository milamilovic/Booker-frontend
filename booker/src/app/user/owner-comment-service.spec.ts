import { TestBed } from '@angular/core/testing';

import { OwnerCommentService } from './owner-comment.service';

describe('OwnerCommentServiceService', () => {
  let service: OwnerCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
