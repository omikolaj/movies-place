import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoPickerComponent } from './repo-picker.component';

describe('RepoPickerComponent', () => {
  let component: RepoPickerComponent;
  let fixture: ComponentFixture<RepoPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
