import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentUsernameComponent } from './comment-username.component';

describe('CommentUsernameComponent', () => {
  let component: CommentUsernameComponent;
  let fixture: ComponentFixture<CommentUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentUsernameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
