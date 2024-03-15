import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state, authService?: AuthService) => {
  const isLoggedIn = authService?.isLoggedIn() || localStorage.getItem('token') !== null;
  return isLoggedIn; 
};