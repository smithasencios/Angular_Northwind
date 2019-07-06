import { PreOrderProduct } from './pre-order-product';

export class PreOrder {
    order_id: Number;
    CustomerId: number;
    OrderDate: String;
    OrderDetails: PreOrderDetail[] = [];
    constructor() {

    }
    static createEmptyInstance() {
        return new PreOrder();
    }
}
export class PreOrderDetail {
    id: Number;
    OrderId: Number;
    ProductId: Number;
    Quantity: number;
    UnitPrice: Number;

    constructor() { }

    static mapOrderDetail(products: PreOrderProduct[]) {
        let newProducts: PreOrderDetail[] = [];
        products.map((item: PreOrderProduct) => {
            const product: PreOrderDetail = new PreOrderDetail();
            product.ProductId = item.Product_Id;
            product.Quantity = item.Quantity;
            product.UnitPrice = item.Quantity;
            newProducts.push(product);
        });
        return newProducts;
    }
}