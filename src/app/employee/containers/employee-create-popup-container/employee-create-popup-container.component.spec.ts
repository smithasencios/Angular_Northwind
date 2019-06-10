import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreatePopupContainerComponent } from './employee-create-popup-container.component';

describe('EmployeeCreatePopupContainerComponent', () => {
  let component: EmployeeCreatePopupContainerComponent;
  let fixture: ComponentFixture<EmployeeCreatePopupContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCreatePopupContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreatePopupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
