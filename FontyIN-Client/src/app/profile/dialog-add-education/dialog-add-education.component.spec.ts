import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddEducationComponent } from './dialog-add-education.component';

describe('DialogAddEducationComponent', () => {
  let component: DialogAddEducationComponent;
  let fixture: ComponentFixture<DialogAddEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
