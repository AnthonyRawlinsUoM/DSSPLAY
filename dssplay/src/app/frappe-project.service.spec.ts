import { TestBed } from '@angular/core/testing';

import { FrappeProjectService } from './frappe-project.service';

describe('FrappeProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FrappeProjectService = TestBed.get(FrappeProjectService);
    expect(service).toBeTruthy();
  });
});
