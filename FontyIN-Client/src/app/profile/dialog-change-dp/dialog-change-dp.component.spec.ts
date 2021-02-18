import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeDpComponent } from './dialog-change-dp.component';

describe('DialogChangeDpComponent', () => {
  let component: DialogChangeDpComponent;
  let fixture: ComponentFixture<DialogChangeDpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChangeDpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChangeDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
