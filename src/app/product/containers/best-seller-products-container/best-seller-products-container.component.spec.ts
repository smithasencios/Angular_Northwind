import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellerProductsContainerComponent } from './best-seller-products-container.component';

describe('BestSellerProductsContainerComponent', () => {
  let component: BestSellerProductsContainerComponent;
  let fixture: ComponentFixture<BestSellerProductsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestSellerProductsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellerProductsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
