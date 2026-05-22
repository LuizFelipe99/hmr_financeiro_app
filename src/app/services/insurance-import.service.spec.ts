import { TestBed } from '@angular/core/testing';

import { InsuranceImportService } from './insurance-import.service';

describe('InsuranceImportService', () => {
  let service: InsuranceImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
