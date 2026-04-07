import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../core/models/category.model';
import { Order, OrderStatus } from '../../core/models/order.model';
import { Product } from '../../core/models/product.model';
import { CategoryService } from '../../core/services/category.service';
import { OrderService } from '../../core/services/order.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  orders: Order[] = [];
  loading = false;
  message = '';

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    imageUrl: [''],
    categoryId: [0, [Validators.required, Validators.min(1)]]
  });

  categoryForm = this.fb.group({
    name: ['', Validators.required],
    description: ['']
  });

  statuses: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  constructor(
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.loadProductsAndOrders();
      },
      error: () => (this.loading = false)
    });
  }

  loadProductsAndOrders(): void {
    this.productService.getProducts({ page: 0, size: 50 }).subscribe({
      next: (res) => {
        this.products = res.data.content;
        this.orderService.getAllOrders().subscribe({
          next: (orderRes) => {
            this.orders = orderRes.data;
            this.loading = false;
          },
          error: () => (this.loading = false)
        });
      },
      error: () => (this.loading = false)
    });
  }

  createProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.productService.createProduct(this.productForm.getRawValue() as any).subscribe({
      next: () => {
        this.message = 'Product created.';
        this.productForm.reset({ name: '', description: '', price: 0, stock: 0, imageUrl: '', categoryId: 0 });
        this.refreshData();
      }
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.message = 'Product deleted.';
        this.refreshData();
      }
    });
  }

  createCategory(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.categoryService.createCategory(this.categoryForm.getRawValue() as { name: string; description: string }).subscribe({
      next: () => {
        this.message = 'Category created.';
        this.categoryForm.reset({ name: '', description: '' });
        this.refreshData();
      }
    });
  }

  updateOrderStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status as OrderStatus).subscribe({
      next: () => {
        this.message = 'Order status updated.';
        this.refreshData();
      }
    });
  }
}
