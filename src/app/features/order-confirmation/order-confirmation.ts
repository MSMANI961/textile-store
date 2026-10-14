
import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.css',
  imports: [Navbar, Footer, RouterLink]
})
export class OrderConfirmation {
  orderNumber = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const orderId = navigation?.extras.state?.['orderId'];

    if (orderId) {
      this.orderNumber = 'TM' + orderId;
    } else {
      this.orderNumber = 'N/A';
    }
  }
}
