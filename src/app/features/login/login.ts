import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    Navbar,
    Footer
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  login(): void {
    console.log('Login button clicked');
  }

}