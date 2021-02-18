import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddExperienceComponent } from './dialog-add-experience.component';

describe('DialogAddExperienceComponent', () => {
  let component: DialogAddExperienceComponent;
  let fixture: ComponentFixture<DialogAddExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
