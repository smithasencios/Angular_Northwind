import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreOrder } from '../models/pre-order';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { OrderList } from '../models/order-list';
import { GetOrders } from '../models/get-orders';
import { OrderListDetail } from '../models/order-list-detail';
import { OrderListItem } from '../models/order-list-item';
import { OrderListDetailItem } from '../models/order-list-detail-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(request: GetOrders): Observable<OrderList> {
    return this.http.post<OrderList>(`${environment.ApiUrl}orders/paginated`, request)
      .pipe(
        map((response: any) => {
          const orderList: OrderList = new OrderList();
          if (!response.data) {
            orderList.data = [];
            return orderList;
          }

          const orderListItemArray: OrderListItem[] = [];

          for (let index = 0; index < response.data.length; index++) {
            const element = response.data[index];
            orderListItemArray.push(OrderListItem.mapFromResponse(element));
          }
          orderList.data = orderListItemArray;
          orderList.totalRecords = response.totalRecords;
          return orderList;
        })
      );
  }

  addOrder(request: PreOrder): Observable<number> {
    return this.http.post(`${environment.ApiUrl}orders`, request)
      .pipe(
        map((response: number) => response)
      );
  }
  updateOrder(request: PreOrder): Observable<Response> {
    return this.http.put(`${environment.ApiUrl}orders`, request)
      .pipe(
        map((response: Response) => response)
      );
  }
  getOrderById(id: number): Observable<OrderListItem> {
    return this.http.get<OrderListItem>(`${environment.ApiUrl}orders/${id}`)
      .pipe(
        map((response: any) => {
          let orderListItem: OrderListItem = new OrderListItem();
          orderListItem = OrderListItem.mapFromResponse(response);
          return orderListItem;
        })
      );
  }
}
