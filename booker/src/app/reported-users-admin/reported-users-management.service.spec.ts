import { TestBed } from '@angular/core/testing';

import { ReportedUsersManagementService } from './reported-users-management.service';

describe('ReportedUsersManagementService', () => {
  let service: ReportedUsersManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportedUsersManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
