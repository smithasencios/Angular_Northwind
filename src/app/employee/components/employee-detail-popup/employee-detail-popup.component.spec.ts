import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailPopupComponent } from './employee-detail-popup.component';

describe('EmployeeDetailPopupComponent', () => {
  let component: EmployeeDetailPopupComponent;
  let fixture: ComponentFixture<EmployeeDetailPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
