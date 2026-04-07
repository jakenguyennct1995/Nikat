import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api.model';
import { AuthResponse, CurrentUser, LoginRequest, RegisterRequest } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'shop_token';
  private readonly userKey = 'shop_user';

  currentUser = signal<CurrentUser | null>(this.getStoredUser());

  constructor(private readonly http: HttpClient) {}

  login(payload: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${environment.apiBaseUrl}/auth/login`, payload).pipe(
      tap((res) => this.storeAuth(res.data))
    );
  }

  register(payload: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${environment.apiBaseUrl}/auth/register`, payload).pipe(
      tap((res) => this.storeAuth(res.data))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(role: 'ROLE_USER' | 'ROLE_ADMIN'): boolean {
    return this.currentUser()?.roles.includes(role) ?? false;
  }

  private storeAuth(auth: AuthResponse): void {
    const user: CurrentUser = {
      userId: auth.userId,
      fullName: auth.fullName,
      email: auth.email,
      roles: auth.roles
    };

    localStorage.setItem(this.tokenKey, auth.token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUser.set(user);
  }

  private getStoredUser(): CurrentUser | null {
    const raw = localStorage.getItem(this.userKey);
    return raw ? (JSON.parse(raw) as CurrentUser) : null;
  }
}
