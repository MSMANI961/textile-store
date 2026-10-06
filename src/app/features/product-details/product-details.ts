import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink,Router } from '@angular/router';

import { Product } from '../../core/models/product';
import { PRODUCTS } from '../../core/data/products';

import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  imports: [
    RouterLink,
    Navbar,
    Footer
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {

  product: Product | undefined;

  quantity = 1;

  constructor(
    private route: ActivatedRoute, 
      private router: Router,
    private cartService: CartService, 
    public wishlistService: WishlistService
   
    
  ) {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.product = PRODUCTS.find(
      product => product.id === id
    );
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

addToCart(): void {
  if (this.product) {

    this.cartService.addToCart(
      this.product,
      this.quantity
    );

    console.log('Product added to cart');

    this.router.navigate(['/cart']);
  }
}
toggleWishlist(): void {
  if (this.product) {
    this.wishlistService.toggle(this.product);
  }
}
}