import { TestBed } from '@angular/core/testing';

import { PostsFacadeService } from './posts-facade.service';

describe('ArticlesFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostsFacadeService = TestBed.get(PostsFacadeService);
    expect(service).toBeTruthy();
  });
});
