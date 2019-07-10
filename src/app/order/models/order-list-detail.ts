import { OrderListDetailItem } from './order-list-detail-item';

export class OrderListDetail {
    data: OrderListDetailItem[];
    TotalValorVenta: number;
    ImpuestoGeneralVentas: number;
    ImporteTotal: number;

    static mapFromResponse(data: any): OrderListDetail {
        if(!data){
            return new OrderListDetail();
        }
        const orderDetail = new OrderListDetail();
        const products: OrderListDetailItem[] = [];
        for (let index = 0; index < data.length; index++) {
            const product = new OrderListDetailItem();
            const element = data[index];
            product.OrderId = element.order_id;
            product.ProductName = element.product_name;
            product.Quantity = element.quantity;
            product.UnitPrice = element.unit_price;
            product.Total = element.quantity * element.unit_price;
            products.push(product);
        }
        orderDetail.data = products;
        orderDetail.TotalValorVenta = Number(products.reduce((sum, item) => sum + item.Total, 0).toFixed(2));
        orderDetail.ImpuestoGeneralVentas = Number((0.18 * orderDetail.TotalValorVenta).toFixed(2));
        orderDetail.ImporteTotal = orderDetail.TotalValorVenta + orderDetail.ImpuestoGeneralVentas;
        return orderDetail;
    }
}