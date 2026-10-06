import {
  Injectable,
  computed,
  inject,
  PLATFORM_ID,
  signal
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private platformId = inject(PLATFORM_ID);

  private productsSignal = signal<Product[]>(
    this.loadWishlist()
  );

  readonly products = this.productsSignal.asReadonly();

  readonly count = computed(
    () => this.productsSignal().length
  );

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private loadWishlist(): Product[] {

    if (!this.isBrowser()) {
      return [];
    }

    const savedWishlist =
      localStorage.getItem('textilemart-wishlist');

    if (!savedWishlist) {
      return [];
    }

    try {
      return JSON.parse(savedWishlist);
    } catch {
      return [];
    }
  }

  private saveWishlist(
    products: Product[]
  ): void {

    if (!this.isBrowser()) {
      return;
    }

    localStorage.setItem(
      'textilemart-wishlist',
      JSON.stringify(products)
    );
  }

  add(product: Product): void {

    const currentProducts =
      this.productsSignal();

    const exists = currentProducts.some(
      item => item.id === product.id
    );

    if (exists) {
      return;
    }

    const updatedProducts = [
      ...currentProducts,
      product
    ];

    this.productsSignal.set(
      updatedProducts
    );

    this.saveWishlist(
      updatedProducts
    );
  }

  remove(productId: number): void {

    const updatedProducts =
      this.productsSignal().filter(
        product => product.id !== productId
      );

    this.productsSignal.set(
      updatedProducts
    );

    this.saveWishlist(
      updatedProducts
    );
  }

  toggle(product: Product): void {

    const exists =
      this.productsSignal().some(
        item => item.id === product.id
      );

    if (exists) {
      this.remove(product.id);
    } else {
      this.add(product);
    }
  }

  isWishlisted(productId: number): boolean {

    return this.productsSignal().some(
      product => product.id === productId
    );
  }

  clear(): void {

    this.productsSignal.set([]);

    this.saveWishlist([]);
  }
}