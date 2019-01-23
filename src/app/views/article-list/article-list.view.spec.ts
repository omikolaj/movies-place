import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListView } from './article-list.view';

describe('ArticleComponent', () => {
  let component: ArticleListView;
  let fixture: ComponentFixture<ArticleListView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleListView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListView);
    component = fixture.componentInstance;ArticleListView
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
