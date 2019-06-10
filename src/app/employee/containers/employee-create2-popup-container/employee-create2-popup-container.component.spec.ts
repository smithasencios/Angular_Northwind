import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreate2PopupContainerComponent } from './employee-create2-popup-container.component';

describe('EmployeeCreate2PopupContainerComponent', () => {
  let component: EmployeeCreate2PopupContainerComponent;
  let fixture: ComponentFixture<EmployeeCreate2PopupContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCreate2PopupContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreate2PopupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
