import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLoggedIn = false;

  constructor(private authService:AuthService, private router:Router) {}

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/home']); 
  }

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe({
      next: s => this.isLoggedIn = s,
      error: err => console.log(err)
    });
  }
}
