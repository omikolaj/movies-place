import { TestBed } from '@angular/core/testing';

import { ArticlesFacadeService } from './articles-facade.service';

describe('ArticlesFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticlesFacadeService = TestBed.get(ArticlesFacadeService);
    expect(service).toBeTruthy();
  });
});
