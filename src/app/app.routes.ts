import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home')
        .then(m => m.Home)
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products')
        .then(m => m.Products)
  },

  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product-details/product-details')
        .then(m => m.ProductDetails)
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart')
        .then(m => m.Cart)
  },

  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist')
        .then(m => m.Wishlist)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login')
        .then(m => m.Login)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register')
        .then(m => m.Register)
  },

  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout')
        .then(m => m.Checkout)
  },
  {
  path: 'order-confirmation',
  loadComponent: () =>
    import('./features/order-confirmation/order-confirmation')
      .then(m => m.OrderConfirmation)
}

];