import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotyfToast } from '../notyf.toast';

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

  constructor(private http: HttpClient, private router: Router,
    private toastrSuccess: ToastrService, 
    private toastrError: ToastrService) {}

  ngOnInit() { }

  onSubmit() {
    this.http.post<any>('http://localhost:4000/api/signup', { name:this.name,username: this.username, email: this.email, password: this.password })
      .subscribe(
        (response) => {
          this.router.navigate(['/login']);
          this.toastrSuccess.success('Registration successful!', '', { toastComponent: NotyfToast }); 

          this.username = '';
          this.email = '';
          this.password = '';
        },
        (error) => {
          this.toastrError.error(  error.error.error, '', { toastComponent: NotyfToast }); 
        }
      );
  }
}