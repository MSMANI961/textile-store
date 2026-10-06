import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    Navbar,
    Footer
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  register(): void {
    console.log('Register button clicked');
  }

}