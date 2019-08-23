import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderErrorsComponent } from './order-errors.component';

describe('OrderErrorsComponent', () => {
  let component: OrderErrorsComponent;
  let fixture: ComponentFixture<OrderErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
