import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private authService:AuthService){}

  canActivate(): boolean {
    if(this.authService.isAdmin()) {
      return true;
    } else {
      alert("Non puoi accedere a quest'area");
      this.router.navigate(['/home']);
      return false;
    }
  }
  
}
