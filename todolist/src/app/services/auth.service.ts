import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUser = this.currentUserSubject.asObservable();
    this.populateCurrentUser(); 
  }

  private populateCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token); 
      this.currentUserSubject.next(decodedToken); 
    }
  }

  private decodeToken(token: string) {
    try {
      return jwtDecode(token); 
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }



  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null); 
  }
}