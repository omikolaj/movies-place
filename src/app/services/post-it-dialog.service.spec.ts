import { TestBed } from '@angular/core/testing';

import { PostItDialogService } from './post-it-dialog.service';

describe('PostItDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostItDialogService = TestBed.get(PostItDialogService);
    expect(service).toBeTruthy();
  });
});
