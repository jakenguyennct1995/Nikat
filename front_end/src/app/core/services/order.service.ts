import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api.model';
import { Order, OrderStatus } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private readonly http: HttpClient) {}

  placeOrder(payload: { shippingAddress: string; phone: string }): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(`${environment.apiBaseUrl}/orders`, payload);
  }

  getMyOrders(): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(`${environment.apiBaseUrl}/orders/me`);
  }

  getAllOrders(): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(`${environment.apiBaseUrl}/admin/orders`);
  }

  updateOrderStatus(id: number, status: OrderStatus): Observable<ApiResponse<Order>> {
    return this.http.patch<ApiResponse<Order>>(`${environment.apiBaseUrl}/admin/orders/${id}/status`, { status });
  }
}
