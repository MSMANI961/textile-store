import { Injectable, computed, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private platformId = inject(PLATFORM_ID);

  private itemsSignal = signal<CartItem[]>(
    this.loadCart()
  );

  readonly items = this.itemsSignal.asReadonly();

  readonly totalItems = computed(() =>
    this.itemsSignal().reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  readonly subtotal = computed(() =>
    this.itemsSignal().reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    )
  );

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private saveCart(items: CartItem[]): void {

    if (!this.isBrowser()) {
      return;
    }

    localStorage.setItem(
      'textilemart-cart',
      JSON.stringify(items)
    );
  }

  private loadCart(): CartItem[] {

    if (!this.isBrowser()) {
      return [];
    }

    const savedCart = localStorage.getItem(
      'textilemart-cart'
    );

    if (!savedCart) {
      return [];
    }

    try {
      return JSON.parse(savedCart);
    } catch {
      return [];
    }
  }
addToCart(
  product: Product,
  quantity: number = 1
): void {

  // Do not add products that are out of stock
  if (product.stock <= 0 || quantity <= 0) {
    return;
  }

  const currentItems = this.itemsSignal();

  const existingItem = currentItems.find(
    item => item.product.id === product.id
  );

  let updatedItems: CartItem[];

  if (existingItem) {

    updatedItems = currentItems.map(item =>
      item.product.id === product.id
        ? {
            ...item,
            quantity: Math.min(
              item.quantity + quantity,
              product.stock
            )
          }
        : item
    );

  } else {

    updatedItems = [
      ...currentItems,
      {
        product,
        quantity: Math.min(quantity, product.stock)
      }
    ];
  }

  this.itemsSignal.set(updatedItems);
  this.saveCart(updatedItems);
}


  increase(productId: number): void {

    const currentItems = this.itemsSignal();

    const updatedItems = currentItems.map(item =>
      item.product.id === productId &&
      item.quantity < item.product.stock
        ? {
            ...item,
            quantity: item.quantity + 1
          }
        : item
    );

    this.itemsSignal.set(updatedItems);

    this.saveCart(updatedItems);
  }

  decrease(productId: number): void {

    const currentItems = this.itemsSignal();

    const updatedItems = currentItems
      .map(item =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      )
      .filter(item => item.quantity > 0);

    this.itemsSignal.set(updatedItems);

    this.saveCart(updatedItems);
  }

  remove(productId: number): void {

    const updatedItems = this.itemsSignal().filter(
      item => item.product.id !== productId
    );

    this.itemsSignal.set(updatedItems);

    this.saveCart(updatedItems);
  }

  clear(): void {

    this.itemsSignal.set([]);

    this.saveCart([]);
  }
}