import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NotyfToast } from '../notyf.toast';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent {
  taskForm = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'high'
  };

  constructor(private authService: AuthService, private http: HttpClient,
    private toastrSuccess: ToastrService, 
    private toastrError: ToastrService) {}

  onSubmit() {
    const { title, description, dueDate, priority } = this.taskForm;
    const token = localStorage.getItem('token');
    let headers: { Authorization: string } | undefined;
    if (token) {
      headers = { Authorization: `Bearer ${token}` };
    }
    const body = { title, description, dueDate, priority };

    this.http.post<any>('http://localhost:4000/api/createtask', body, { headers })
      .subscribe(
        (response) => {
          this.toastrSuccess.success('Task created successfully!', '', { toastComponent: NotyfToast }); 
          this.resetForm();
        },
        (error) => {
          this.toastrError.error(  'All fields are Required', '', { toastComponent: NotyfToast }); 
        }
      );
  }

  resetForm(): void {
    this.taskForm = {
      title: '',
      description: '',
      dueDate: '',
      priority: 'high'
    };
  }
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}


