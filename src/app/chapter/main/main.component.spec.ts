import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterMainComponent } from './main.component';

describe('ChapterMainComponent', () => {
  let component: ChapterMainComponent;
  let fixture: ComponentFixture<ChapterMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChapterMainComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
