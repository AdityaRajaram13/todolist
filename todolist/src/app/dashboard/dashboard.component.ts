import { Component,OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateTaskModalComponent } from '../update-task-modal/update-task-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getUserTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
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
          this.loadTasks(); // Reload tasks after deletion
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }
}