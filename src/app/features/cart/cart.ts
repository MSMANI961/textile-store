import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartService } from '../../core/services/cart.service';

import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-cart',
  imports: [
    RouterLink,
    Navbar,
    Footer
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  constructor(
    public cartService: CartService
  ) {}

  increase(productId: number): void {
    this.cartService.increase(productId);
  }

  decrease(productId: number): void {
    this.cartService.decrease(productId);
  }

  remove(productId: number): void {
    this.cartService.remove(productId);
  }

  clearCart(): void {
    this.cartService.clear();
  }
}