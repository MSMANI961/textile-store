import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WishlistService } from '../../core/services/wishlist.service';

import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-wishlist',
  imports: [
    RouterLink,
    Navbar,
    Footer
  ],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {

  constructor(
    public wishlistService: WishlistService
  ) {}

  remove(productId: number): void {
    this.wishlistService.remove(productId);
  }

  clearWishlist(): void {
    this.wishlistService.clear();
  }
}