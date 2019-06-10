import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAddProductContainerComponent } from './order-add-product-container.component';

describe('OrderAddProductContainerComponent', () => {
  let component: OrderAddProductContainerComponent;
  let fixture: ComponentFixture<OrderAddProductContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAddProductContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAddProductContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
