import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CartService } from '../../core/services/cart.service';

import { Navbar } from '../../shared/navbar/navbar';
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

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  placeOrder(): void {

    if (this.cartService.items().length === 0) {
      return;
    }

    // Clear the cart
    this.cartService.clear();

    // Navigate to order confirmation
    this.router.navigate(['/order-confirmation']);
  }

}