import { TestBed } from '@angular/core/testing';

import { AuditService } from './audit-log.service';

describe('AuditLogService', () => {
  let service: AuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
