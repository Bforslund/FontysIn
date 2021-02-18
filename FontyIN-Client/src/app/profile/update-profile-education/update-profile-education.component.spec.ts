import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileEducationComponent } from './update-profile-education.component';

describe('UpdateProfileEducationComponent', () => {
  let component: UpdateProfileEducationComponent;
  let fixture: ComponentFixture<UpdateProfileEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfileEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
