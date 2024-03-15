import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

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

  constructor(private authService: AuthService, private http: HttpClient) {}

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
          console.log('Task created successfully:', response);
          alert('Task created successfully!');
        },
        (error) => {
          console.error('Error creating task:', error);
          alert('Error creating task')
        }
      );
  }
}
