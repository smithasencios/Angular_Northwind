import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSessionsErrorsComponent } from './employee-sessions-errors.component';

describe('EmployeeSessionsErrorsComponent', () => {
  let component: EmployeeSessionsErrorsComponent;
  let fixture: ComponentFixture<EmployeeSessionsErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSessionsErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSessionsErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
