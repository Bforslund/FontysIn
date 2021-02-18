import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMessageComponent } from './selected-message.component';

describe('SelectedMessageComponent', () => {
  let component: SelectedMessageComponent;
  let fixture: ComponentFixture<SelectedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
