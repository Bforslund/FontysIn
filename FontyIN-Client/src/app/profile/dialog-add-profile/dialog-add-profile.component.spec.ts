import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddProfileComponent } from './dialog-add-profile.component';

describe('DialogAddProfileComponent', () => {
  let component: DialogAddProfileComponent;
  let fixture: ComponentFixture<DialogAddProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




