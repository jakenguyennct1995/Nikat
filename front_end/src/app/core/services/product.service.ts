import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, PageResponse } from '../models/api.model';
import { Product, ProductRequest } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  getProducts(params: {
    page?: number;
    size?: number;
    search?: string;
    categoryId?: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
  }): Observable<ApiResponse<PageResponse<Product>>> {
    let query = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query = query.set(key, String(value));
      }
    });

    return this.http.get<ApiResponse<PageResponse<Product>>>(`${environment.apiBaseUrl}/products`, { params: query });
  }

  getProductById(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${environment.apiBaseUrl}/products/${id}`);
  }

  createProduct(payload: ProductRequest): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${environment.apiBaseUrl}/admin/products`, payload);
  }

  updateProduct(id: number, payload: ProductRequest): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${environment.apiBaseUrl}/admin/products/${id}`, payload);
  }

  deleteProduct(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${environment.apiBaseUrl}/admin/products/${id}`);
  }
}
