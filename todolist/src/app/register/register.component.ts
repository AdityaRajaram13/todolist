import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  name: string='';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() { }

  onSubmit() {
    this.http.post<any>('http://localhost:4000/api/signup', { name:this.name,username: this.username, email: this.email, password: this.password })
      .subscribe(
        (response) => {
          this.router.navigate(['/login']);
          alert('Registration successful!');
          this.username = '';
          this.email = '';
          this.password = '';
        },
        (error) => {
          alert('Registration failed: ' + error.error.error);
        }
      );
  }
}