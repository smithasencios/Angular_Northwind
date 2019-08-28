import { OrderListDetailItem } from './order-list-detail-item';

export class OrderListDetail {
    data: OrderListDetailItem[];
    TotalValorVenta: number;
    ImpuestoGeneralVentas: number;
    ImporteTotal: number;

    static mapFromResponse(data: any): OrderListDetail {        
        if (!data) {
            return new OrderListDetail();
        }
        const orderDetail = new OrderListDetail();
        const products: OrderListDetailItem[] = [];
        for (let index = 0; index < data.length; index++) {
            const orderItems = new OrderListDetailItem();
            const element = data[index];
            orderItems.Id = element.id;
            orderItems.ProductId = element.product_id;
            orderItems.OrderId = element.order_id;
            orderItems.ProductName = element.product_name;
            orderItems.Quantity = element.quantity;
            orderItems.UnitPrice = element.unit_price;
            orderItems.Total = element.quantity * element.unit_price;
            products.push(orderItems);
        }
        orderDetail.data = products;
        orderDetail.TotalValorVenta = Number(products.reduce((sum, item) => sum + item.Total, 0).toFixed(2));
        orderDetail.ImpuestoGeneralVentas = Number((0.18 * orderDetail.TotalValorVenta).toFixed(2));
        orderDetail.ImporteTotal = orderDetail.TotalValorVenta + orderDetail.ImpuestoGeneralVentas;                
        return orderDetail;
    }
}