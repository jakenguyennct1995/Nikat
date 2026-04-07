import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api.model';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(`${environment.apiBaseUrl}/categories`);
  }

  createCategory(payload: Pick<Category, 'name' | 'description'>): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(`${environment.apiBaseUrl}/admin/categories`, payload);
  }

  updateCategory(id: number, payload: Pick<Category, 'name' | 'description'>): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(`${environment.apiBaseUrl}/admin/categories/${id}`, payload);
  }

  deleteCategory(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${environment.apiBaseUrl}/admin/categories/${id}`);
  }
}
