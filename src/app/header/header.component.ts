import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLoggedIn = false;

  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe({
      next: s => this.isLoggedIn = s,
      error: err => console.log(err)
    });
  }
}
