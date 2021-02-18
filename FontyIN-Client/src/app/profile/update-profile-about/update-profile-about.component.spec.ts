import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileAboutComponent } from './update-profile-about.component';

describe('UpdateProfileAboutComponent', () => {
  let component: UpdateProfileAboutComponent;
  let fixture: ComponentFixture<UpdateProfileAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfileAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
