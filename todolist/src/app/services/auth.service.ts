import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
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

  signIn(username: string, password: string): Observable<any> {    
    return this.http.post<any>(`${this.baseUrl}/signin`, { username, password });
  }

  signUp(name: string, username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, { name, username, email, password });
  }
}
