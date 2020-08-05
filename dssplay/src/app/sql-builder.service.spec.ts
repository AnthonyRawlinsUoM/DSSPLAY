import { TestBed } from '@angular/core/testing';

import { SqlBuilderService } from './sql-builder.service';

describe('SqlBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SqlBuilderService = TestBed.get(SqlBuilderService);
    expect(service).toBeTruthy();
  });
});
