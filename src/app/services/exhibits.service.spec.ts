import { TestBed } from '@angular/core/testing';

import { ExhibitsService } from './exhibits.service';

describe('ExhibitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExhibitsService = TestBed.get(ExhibitsService);
    expect(service).toBeTruthy();
  });
});
