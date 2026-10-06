import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.css',
  imports: [Navbar, Footer]
})
export class OrderConfirmation {

  orderNumber = 'TM' + Math.floor(100000 + Math.random() * 900000);

}