import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false; 
  constructor(private authService: AuthService, private router: Router) { }  

  ngOnInit() {
    this.isLoggedIn = this.authService?.isLoggedIn(); 
  }

  logout() { 
    this.authService?.logout(); 
    this.router.navigate(['/login']); 
  }
}
