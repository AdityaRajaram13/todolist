import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any, state: any): boolean {
    const isLoggedIn = this.authService.isLoggedIn(); 
    if (!isLoggedIn && localStorage.getItem('token') === null) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); 
      return false;
    }

    return true;
  }
}


