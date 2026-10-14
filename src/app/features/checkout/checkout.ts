import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CartService } from '../../core/services/cart.service';
import {
  OrderService,
  CustomerOrder
} from '../../core/services/order.service';

import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    Footer
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

  firstName = '';
  lastName = '';
  email = '';
  mobileNumber = '';
  address = '';
  city = '';
  pinCode = '';
  paymentMethod = 'cod';

  submitting = false;
  errorMessage = '';

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  placeOrder(): void {

    if (this.cartService.items().length === 0 || this.submitting) {
      return;
    }

    const order: CustomerOrder = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobileNumber: this.mobileNumber,
      address: this.address,
      city: this.city,
      pinCode: this.pinCode,
      paymentMethod: this.paymentMethod,
      totalAmount: this.cartService.subtotal()
    };

    this.submitting = true;
    this.errorMessage = '';

    this.orderService.createOrder(order).subscribe({
      next: (savedOrder) => {
        // Keep the generated order ID for confirmation
        this.cartService.clear();

        this.router.navigate(['/order-confirmation'], {
          state: { orderId: savedOrder.id }
        });
      },
      error: (error) => {
        console.error('Error placing order:', error);
        this.errorMessage =
          'Unable to place your order. Please try again.';
        this.submitting = false;
      }
    });
  }
}
