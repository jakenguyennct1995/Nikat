import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cart = computed(() => this.cartService.cart());
  loading = false;
  error = '';

  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.loading = true;
    this.cartService.loadCart().subscribe({
      next: () => (this.loading = false),
      error: () => {
        this.loading = false;
        this.error = 'Failed to load cart.';
      }
    });
  }

  updateQuantity(itemId: number, quantity: number): void {
    if (quantity < 1) {
      return;
    }
    this.cartService.updateItem(itemId, quantity).subscribe();
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId).subscribe();
  }
}
