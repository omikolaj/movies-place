import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesView } from './movies.view';

describe('MoviesComponent', () => {
  let component: MoviesView;
  let fixture: ComponentFixture<MoviesView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
