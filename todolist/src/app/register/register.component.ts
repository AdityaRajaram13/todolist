// import { Component,OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { NotyfToast } from '../notyf.toast';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent implements OnInit {
//   name: string='';
//   username: string = '';
//   email: string = '';
//   password: string = '';

//   constructor(private http: HttpClient, private router: Router,
//     private toastrSuccess: ToastrService, 
//     private toastrError: ToastrService,
//     private authService: AuthService,
//     ) {}

//   ngOnInit() { }

//   onSubmit() {
//     this.authService.signUp(this.name, this.username, this.email, this.password)
//       .subscribe(
//         (response) => {
//           this.router.navigate(['/login']);
//           this.toastrSuccess.success('Registration successful!', '', { toastComponent: NotyfToast }); 

//           this.username = '';
//           this.email = '';
//           this.password = '';
//         },
//         (error) => {
//           this.toastrError.error(  error.error.error, '', { toastComponent: NotyfToast }); 
//         }
//       );
//   }
// }



import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NotyfToast } from '../notyf.toast';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string='';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrSuccess: ToastrService,
    private toastrError: ToastrService
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.signUp(this.name, this.username, this.email, this.password)
        .subscribe(
          (response) => {
            this.router.navigate(['/login']);
            this.toastrSuccess.success('Registration successful!', '', { toastComponent: NotyfToast }); 

            this.username = '';
            this.email = '';
            this.password = '';
          },
          (error) => {
            this.toastrError.error(error.error.error, '', { toastComponent: NotyfToast }); 
          }
        );
    }
  }
}
