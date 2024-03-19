import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotyfToast } from '../notyf.toast';
import { AuthService } from '../services/auth.service'; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastrSuccess: ToastrService, 
    private toastrError: ToastrService,
  ) {}

  ngOnInit() { }

  onSubmit(form: NgForm) {
    if (form.valid) {
    this.authService.signIn(this.username, this.password) 
      .subscribe(
        (response) => {
          if (response.status === 'success') {
            localStorage.setItem('token', response.token);
            this.toastrSuccess.success('Login Successful!', 'LOGIN', { toastComponent: NotyfToast }); 
            this.router.navigate(['/dashboard']);
          } else {
            this.toastrError.error(response.error, 'Login failed:', { toastComponent: NotyfToast }); 
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
    }else
    {
      this.toastrError.error( 'All valid fields required', '', { toastComponent: NotyfToast }); 
    }
  }
}
