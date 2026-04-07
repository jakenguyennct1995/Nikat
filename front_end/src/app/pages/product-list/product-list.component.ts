import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Category } from '../../core/models/category.model';
import { Product } from '../../core/models/product.model';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  loading = false;
  error = '';
  page = 0;
  totalPages = 0;

  filterForm = this.fb.group({
    search: [''],
    categoryId: [''],
    sortBy: ['name'],
    sortDir: ['asc']
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    this.error = '';
    const value = this.filterForm.value;

    this.productService
      .getProducts({
        page: this.page,
        size: 9,
        search: value.search ?? undefined,
        categoryId: value.categoryId ? Number(value.categoryId) : undefined,
        sortBy: value.sortBy ?? 'name',
        sortDir: (value.sortDir as 'asc' | 'desc') ?? 'asc'
      })
      .subscribe({
        next: (res) => {
          this.products = res.data.content;
          this.totalPages = res.data.totalPages;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.error = 'Failed to load products. Please try again.';
        }
      });
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res) => (this.categories = res.data)
    });
  }

  applyFilters(): void {
    this.page = 0;
    this.fetchProducts();
  }

  nextPage(): void {
    if (this.page + 1 < this.totalPages) {
      this.page += 1;
      this.fetchProducts();
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page -= 1;
      this.fetchProducts();
    }
  }
}
