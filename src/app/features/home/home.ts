import { Component } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Navbar } from '../../shared/navbar/navbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    Navbar,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
