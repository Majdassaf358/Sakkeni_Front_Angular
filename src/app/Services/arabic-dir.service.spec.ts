import { TestBed } from '@angular/core/testing';

import { ArabicDirService } from './arabic-dir.service';

describe('ArabicDirService', () => {
  let service: ArabicDirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArabicDirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
