import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  loading = true;
  error = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Product not found.';
        this.loading = false;
      }
    });
  }

  addToCart(): void {
    if (!this.product) {
      return;
    }
    this.cartService.addItem(this.product.id, 1).subscribe();
  }
}
