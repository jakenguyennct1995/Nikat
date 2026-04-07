import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api.model';
import { Cart } from '../models/cart.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  cart = signal<Cart | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  loadCart(): Observable<ApiResponse<Cart>> {
    return this.http.get<ApiResponse<Cart>>(`${environment.apiBaseUrl}/cart`).pipe(
      tap((res) => this.cart.set(res.data))
    );
  }

  addItem(productId: number, quantity = 1): Observable<ApiResponse<Cart>> {
    return this.http.post<ApiResponse<Cart>>(`${environment.apiBaseUrl}/cart/items`, { productId, quantity }).pipe(
      tap((res) => this.cart.set(res.data))
    );
  }

  updateItem(itemId: number, quantity: number): Observable<ApiResponse<Cart>> {
    return this.http.put<ApiResponse<Cart>>(`${environment.apiBaseUrl}/cart/items/${itemId}`, { quantity }).pipe(
      tap((res) => this.cart.set(res.data))
    );
  }

  removeItem(itemId: number): Observable<ApiResponse<Cart>> {
    return this.http.delete<ApiResponse<Cart>>(`${environment.apiBaseUrl}/cart/items/${itemId}`).pipe(
      tap((res) => this.cart.set(res.data))
    );
  }

  init(): void {
    if (this.authService.isLoggedIn()) {
      this.loadCart().subscribe({ error: () => this.cart.set(null) });
    }
  }
}
