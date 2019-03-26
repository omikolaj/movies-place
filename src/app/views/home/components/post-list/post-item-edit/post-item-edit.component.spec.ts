import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemEditComponent } from './post-item-edit.component';

describe('PostItemEditComponent', () => {
  let component: PostItemEditComponent;
  let fixture: ComponentFixture<PostItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
