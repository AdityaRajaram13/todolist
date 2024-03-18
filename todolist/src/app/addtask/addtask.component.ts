import { Component } from '@angular/core';
import { TaskService } from '../services/task.service'; // Import TaskService
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

  constructor(
    private taskService: TaskService, // Inject TaskService
    private toastrSuccess: ToastrService,
    private toastrError: ToastrService
  ) {}

  onSubmit() {
    const { title, description, dueDate, priority } = this.taskForm;

    const taskData = { title, description, dueDate, priority };

    this.taskService.createTask(taskData).subscribe(
      (response) => {
        this.toastrSuccess.success('Task created successfully!', '', { toastComponent: NotyfToast });
        this.resetForm();
      },
      (error) => {
        this.toastrError.error('All fields are required', '', { toastComponent: NotyfToast });
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
