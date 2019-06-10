import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreatePopupComponent } from './employee-create-popup.component';

describe('EmployeeCreatePopupComponent', () => {
  let component: EmployeeCreatePopupComponent;
  let fixture: ComponentFixture<EmployeeCreatePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCreatePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
