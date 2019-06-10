import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBestComponent } from './employee-best.component';

describe('EmployeeBestComponent', () => {
  let component: EmployeeBestComponent;
  let fixture: ComponentFixture<EmployeeBestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
