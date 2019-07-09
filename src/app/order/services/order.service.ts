import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreOrder } from '../models/pre-order';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { OrderList } from '../models/order-list';
import { GetOrders } from '../models/get-orders';
import { OrderListDetail } from '../models/order-list-detail';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(request: GetOrders): Observable<OrderList> {
    return this.http.post<OrderList>(`${environment.ApiUrl}orders/paginated`, request);
  }

  addOrder(request: PreOrder): Observable<number> {
    return this.http.post(`${environment.ApiUrl}orders`, request)
      .pipe(
        map((response: number) => response)
      );
  }
  getOrderById(id: number): Observable<OrderListDetail> {
    return this.http.get<OrderListDetail>(`${environment.ApiUrl}orders/${id}`);
  }
}
