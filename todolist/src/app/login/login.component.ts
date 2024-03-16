import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotyfToast } from '../notyf.toast'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrSuccess: ToastrService, 
    private toastrError: ToastrService,
  ) {}

  ngOnInit() { }

  onSubmit() {
    this.http.post<any>('http://localhost:4000/api/signin', { username: this.username, password: this.password })
      .subscribe(
        (response) => {
          if (response.status === 'success') {
            localStorage.setItem('token', response.token);
            this.toastrSuccess.success('Login Successful!', 'LOGIN', { toastComponent: NotyfToast }); // Display success toast
            this.router.navigate(['/dashboard']);
          } else {
            this.toastrError.error(response.error, 'Login failed:', { toastComponent: NotyfToast }); // Display server error in toast
          }
        },
        (error) => {
          if (error.error && error.error.error) {
            this.toastrError.error(  error.error.error, 'Login failed:', { toastComponent: NotyfToast }); 
          } else {
            this.toastrError.error( error.message, 'Login failed:', { toastComponent: NotyfToast }); 
          }
        }
      );
  }
}
