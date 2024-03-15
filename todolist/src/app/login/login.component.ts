import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() { }

  onSubmit() {
    this.http.post<any>('http://localhost:4000/api/signin', { username: this.username, password: this.password })
      .subscribe(
        (response) => {
          if (response.status === 'success') {
            localStorage.setItem('token', response.token); 
            alert('Login successful!');
            this.router.navigate(['/dashboard']); 
          } else {
            alert(response.error);
          }
        },
        (error) => {
          alert('Login failed: ' + error.message);
        }
      );
  }
}