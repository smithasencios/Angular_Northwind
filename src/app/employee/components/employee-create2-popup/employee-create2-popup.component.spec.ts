import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreate2PopupComponent } from './employee-create2-popup.component';

describe('EmployeeCreate2PopupComponent', () => {
  let component: EmployeeCreate2PopupComponent;
  let fixture: ComponentFixture<EmployeeCreate2PopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCreate2PopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreate2PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
