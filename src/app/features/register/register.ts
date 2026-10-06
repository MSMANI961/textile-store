import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';

@Component({
  imports: [Navbar, Footer],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
register: any;
}
