import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  loading = false;
  error = '';
  success = '';

  form = this.fb.group({
    shippingAddress: ['', [Validators.required, Validators.minLength(8)]],
    phone: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly orderService: OrderService,
    private readonly router: Router
  ) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.orderService.placeOrder(this.form.getRawValue() as { shippingAddress: string; phone: string }).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Order placed successfully.';
        setTimeout(() => this.router.navigate(['/products']), 1200);
      },
      error: () => {
        this.loading = false;
        this.error = 'Could not place order. Please check your cart and try again.';
      }
    });
  }
}
