
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomerOrder {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  city: string;
  pinCode: string;
  paymentMethod: string;
  totalAmount: number;
  status?: string;
  orderDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);

  private apiUrl = 'https://textile-store-backend.onrender.com/api/orders';

  createOrder(order: CustomerOrder): Observable<CustomerOrder> {
    return this.http.post<CustomerOrder>(
      this.apiUrl,
      order
    );
  }
}
