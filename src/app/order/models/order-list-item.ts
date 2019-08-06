import { OrderListDetail } from './order-list-detail';

export class OrderListItem {
    Order_Id: number;
    Customer_Id: number;
    Order_Date: string;
    Status_Id: number;
    Status_Name: string;
    Customer: string;
    Company: string;
    Address: string;
    City: string;
    Phone: string;
    Data: OrderListDetail;

    static mapFromResponse(data: any): OrderListItem {
        const orderListItem: OrderListItem = new OrderListItem();
        orderListItem.Order_Id = data.order_id;
        orderListItem.Customer = data.customer;
        orderListItem.Customer_Id = data.customer_id;
        orderListItem.Company = data.company;
        orderListItem.Address = data.address;
        orderListItem.City = data.city;
        orderListItem.Phone = data.phone;
        orderListItem.Order_Date = data.order_date;
        orderListItem.Status_Id = data.status_id;
        orderListItem.Status_Name = data.status_name;
        orderListItem.Data = OrderListDetail.mapFromResponse(data.data);
        return orderListItem;
    }
}