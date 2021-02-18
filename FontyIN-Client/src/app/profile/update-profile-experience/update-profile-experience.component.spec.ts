import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileExperienceComponent } from './update-profile-experience.component';

describe('UpdateProfileExperienceComponent', () => {
  let component: UpdateProfileExperienceComponent;
  let fixture: ComponentFixture<UpdateProfileExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfileExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
