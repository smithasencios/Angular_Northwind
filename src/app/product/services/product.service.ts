import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetProducts } from '../models/get-products';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductList } from '../models/product-list';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { ProductBestSeller } from '../models/product-best-seller';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(request: GetProducts): Observable<ProductList> {
    return this.http.post<ProductList>(`${environment.ApiUrl}products/paginated`, request);
  }
  addProduct(product: Product): Observable<Response> {
    return this.http.post(`${environment.ApiUrl}products`, product)
      .pipe(
        map((response: Response) => response)
      );
  }
  deleteProduct(productId: number): Observable<Response> {
    return this.http.delete(`${environment.ApiUrl}products/${productId}`)
      .pipe(
        map((response: Response) => response)
      );
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.ApiUrl}products/${id}`);
  }
  updateProduct(product: Product): Observable<Response> {
    return this.http.put(`${environment.ApiUrl}products`, product)
      .pipe(
        map((response: Response) => response)
      );
  }
  getBestSellers(): Observable<ProductBestSeller[]> {
    return this.http.get(`${environment.ApiUrl}products/bestSellers`)
      .pipe(
        map((response: any) =>
          response.data.map((product: any) =>
            ProductBestSeller.mapFromResponse(product, response.totalVentas)))
      );
  }
}
