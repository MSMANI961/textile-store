import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../core/models/product';
import { ProductService } from '../../core/services/product.service';

import { Footer } from '../../shared/footer/footer';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    Navbar,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private productService = inject(ProductService);

  products: Product[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data.slice(0, 4);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading home products:', error);
        this.errorMessage = 'Unable to load products.';
        this.loading = false;
      }
    });
  }
}
