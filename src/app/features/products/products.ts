
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../core/models/product';
import { ProductService } from '../../core/services/product.service';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
import { WishlistService } from '../../core/services/wishlist.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    Navbar,
    FormsModule,
    Footer
  ],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
public wishlistService = inject(WishlistService);
  private productService = inject(ProductService);
private cdr = inject(ChangeDetectorRef);
sortOption = 'popular';
  products: Product[] = [];
  allProducts: Product[] = [];

  selectedCategory = 'All';

  loading = true;
  errorMessage = '';

  categories = [
    'All',
    'Sarees',
    'Women',
    'Men',
    'Kids'
  ];

  ngOnInit(): void {
  
    this.loading = true;
    this.errorMessage = '';

    this.productService.getAllProducts().subscribe({
//       next: (data) => {

//         this.allProducts = data;
//                 console.log('[Products] API response:', this.allProducts);
//                 console.log('allProducts count:', this.allProducts.length);
// console.log('products count before filter:', this.products.length);

//         this.filterProducts(this.selectedCategory);
//         console.log('Products after filter:', this.products.length);
// console.log('Filtered products:', this.products);
//         this.loading = false;
//                         console.log('load:', this.loading);

//       },
next: (data) => {
  this.allProducts = data;
  this.filterProducts(this.selectedCategory);
  this.loading = false;

  this.cdr.detectChanges();


},
      error: (error) => {
        

        this.errorMessage =
          'Unable to load products. Please try again.';

        this.loading = false;
      }
    });
  }

  filterProducts(category: string): void {
    this.selectedCategory = category;

    if (category === 'All') {
      this.products = [...this.allProducts];
      return;
    }

    this.products = this.allProducts.filter(
      product => product.category === category
    );
  }
  toggleWishlist(product: Product): void {
  this.wishlistService.toggle(product);
}
sortProducts(): void {
  const sorted = [...this.products];

  switch (this.sortOption) {
    case 'low':
      sorted.sort((a, b) => a.price - b.price);
      break;

    case 'high':
      sorted.sort((a, b) => b.price - a.price);
      break;

    case 'popular':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
  }

  this.products = sorted;
}
}
