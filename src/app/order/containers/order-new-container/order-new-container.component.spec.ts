import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNewContainerComponent } from './order-new-container.component';

describe('OrderNewContainerComponent', () => {
  let component: OrderNewContainerComponent;
  let fixture: ComponentFixture<OrderNewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderNewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
