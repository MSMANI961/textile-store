import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../core/models/product';
import { PRODUCTS } from '../../core/data/products';

import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    Navbar,
    Footer
  ],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {

  products: Product[] = PRODUCTS;

  selectedCategory = 'All';

  categories = [
    'All',
    'Sarees',
    'Women',
    'Men',
    'Kids'
  ];

  filterProducts(category: string): void {

    this.selectedCategory = category;

    if (category === 'All') {
      this.products = PRODUCTS;
      return;
    }

    this.products = PRODUCTS.filter(
      product => product.category === category
    );
  }
}