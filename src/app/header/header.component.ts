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
  userId!:number;
  isAdmin = false;

  constructor(private authService:AuthService, private router: Router) {}

  logout() {
    console.log('logout nell\'header');
    this.authService.logout(); 
    this.router.navigate(['/home']); 
  }

  ngOnInit(): void {
    this.userId = Number(this.authService.getUserIdFromToken());
    this.authService.loggedIn$.subscribe({
      next: s =>{
        this.isLoggedIn = s,
        this.isAdmin = this.authService.isAdminFromToken();
      } ,
      error: err => console.log(err)
    });
   
  }

  onClick(userId:number){
    this.router.navigate([`user-reviews/${userId}`]);
  }
}
