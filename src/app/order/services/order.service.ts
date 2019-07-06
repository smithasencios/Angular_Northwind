import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreOrder } from '../models/pre-order';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  addOrder(request: PreOrder): Observable<number> {
    return this.http.post(`${environment.ApiUrl}orders`, request)
      .pipe(
        map((response: number) => response)
      );
  }
}
