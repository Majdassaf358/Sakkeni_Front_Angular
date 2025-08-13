import { TestBed } from '@angular/core/testing';

import { OpenSideService } from './open-side.service';

describe('OpenSideService', () => {
  let service: OpenSideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenSideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
