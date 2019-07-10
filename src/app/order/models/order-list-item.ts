import { OrderListDetail } from './order-list-detail';

export class OrderListItem {
    Order_Id: number;
    Customer_Id: number;
    Order_Date: string;
    Status_Id: number;
    Status_Name: string;
    Customer: string;
    Data: OrderListDetail;

    static mapFromResponse(data: any): OrderListItem {
        const orderListItem: OrderListItem = new OrderListItem();
        orderListItem.Order_Id = data.order_id;
        orderListItem.Customer = data.customer;
        orderListItem.Customer_Id = data.customer_id;
        orderListItem.Order_Date = data.order_date;
        orderListItem.Status_Id = data.status_id;
        orderListItem.Status_Name = data.status_name;
        orderListItem.Data = OrderListDetail.mapFromResponse(data.data);
        return orderListItem;
    }
}