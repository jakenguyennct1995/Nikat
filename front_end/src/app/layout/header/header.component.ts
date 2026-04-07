import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  cartCount = computed(() => this.cartService.cart()?.items.length ?? 0);

  constructor(
    public authService: AuthService,
    private readonly cartService: CartService
  ) {}

  logout(): void {
    this.authService.logout();
    this.cartService.cart.set(null);
  }
}
