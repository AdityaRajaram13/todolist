import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { NotyfToast } from '../notyf.toast'; // Import NotyfToast component

@Component({
  selector: 'app-update-task-modal',
  templateUrl: './update-task-modal.component.html',
  styleUrls: ['./update-task-modal.component.css']
})
export class UpdateTaskModalComponent implements OnInit {
  @Input() task: any;

  updatedTask: any;

  constructor(public activeModal: NgbActiveModal, private taskService: TaskService,
    private toastrSuccess: ToastrService, 
    private toastrError: ToastrService) { }

  ngOnInit(): void {
    this.updatedTask = { ...this.task };
  }

  onUpdate(): void {
    this.taskService.updateTask(this.task._id, this.updatedTask).subscribe(
      () => {
        this.toastrSuccess.success('Task updated successfully', 'Success', { toastComponent: NotyfToast }); 
        this.activeModal.close('taskUpdated');
      },
      (error) => {
        console.error('Error updating task:', error);
        this.toastrError.error(  'Error updating task:', 'Task Update Error', { toastComponent: NotyfToast }); 
      }
      
    );
    
  }

  onCancel(): void {
    this.activeModal.dismiss('cancel');
  }
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  getMaxDate(): string {
    const today = new Date();
    const year = today.getFullYear() + 20;
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
}
