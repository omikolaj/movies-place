import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItDialog } from './post-it-dialog.component';

describe('PostItComponent', () => {
  let component: PostItDialog;
  let fixture: ComponentFixture<PostItDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostItDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
