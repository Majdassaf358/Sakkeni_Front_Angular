import { TestBed } from '@angular/core/testing';

import { ProjectIdsService } from './project-ids.service';

describe('ProjectIdsService', () => {
  let service: ProjectIdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectIdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
