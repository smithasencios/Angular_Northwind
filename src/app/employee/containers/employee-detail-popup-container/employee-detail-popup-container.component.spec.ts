import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailPopupContainerComponent } from './employee-detail-popup-container.component';

describe('EmployeeDetailPopupContainerComponent', () => {
  let component: EmployeeDetailPopupContainerComponent;
  let fixture: ComponentFixture<EmployeeDetailPopupContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailPopupContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailPopupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
