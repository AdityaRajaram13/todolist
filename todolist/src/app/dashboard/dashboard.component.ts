import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateTaskModalComponent } from '../update-task-modal/update-task-modal.component';
import { ToastrService } from 'ngx-toastr';
import { NotyfToast } from '../notyf.toast';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  sortBy: string = '';
  sortOrder: string = 'asc';

  constructor(private taskService: TaskService, private modalService: NgbModal,
    private toastrSuccess: ToastrService, 
    private toastrError: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getUserTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.sortTasks(); 
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.toastrError.error( 'Failed to fetch tasks.Please try again later.', 'Error', { toastComponent: NotyfToast }); 

      }
    );
  }

  sortTasks(): void {
    console.log('Sorting tasks by:', this.sortBy, 'in', this.sortOrder, 'order');
    if (this.sortBy) { 
      if (this.sortBy === 'dueDate') {
        this.tasks.sort((a, b) => {
          const dateA = new Date(a.dueDate).getTime();
          const dateB = new Date(b.dueDate).getTime();
          return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
      } else if (this.sortBy === 'priority') {
        const priorityOrder = {
          'low': 0,
          'medium': 1,
          'high': 2
        };
        this.tasks.sort((a, b) => {
          const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder];
          const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder];
          return this.sortOrder === 'asc' ? priorityA - priorityB : priorityB - priorityA;
        });
      }
    }
    
  }
  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    console.log('Toggled sort order to:', this.sortOrder);
    this.sortTasks(); 
  }

  openUpdateModal(task: any): void {
    const modalRef = this.modalService.open(UpdateTaskModalComponent);
    modalRef.componentInstance.task = task;
    modalRef.result.then(
      (result) => {
        if (result === 'taskUpdated') {
          this.loadTasks();
        }
      },
      (reason) => {
        console.log(`Modal dismissed with reason: ${reason}`);
      }
    );
  }

  confirmDelete(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(
        () => {
          this.loadTasks();
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }
  redirectToCreateTask(): void {
    this.router.navigateByUrl('/addtask');
  }
}
