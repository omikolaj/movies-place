import { TestBed } from '@angular/core/testing';

import { MoviesFacadeService } from './movies-facade.service';

describe('MovieFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoviesFacadeService = TestBed.get(MoviesFacadeService);
    expect(service).toBeTruthy();
  });
});
