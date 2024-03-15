import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../services/task.service';
@Component({
  selector: 'app-update-task-modal',
  templateUrl: './update-task-modal.component.html',
  styleUrls: ['./update-task-modal.component.css']
})
export class UpdateTaskModalComponent {
  @Input() task: any;

  updatedTask: any = {};

  constructor(public activeModal: NgbActiveModal, private taskService: TaskService) { }

  onUpdate(): void {
    this.taskService.updateTask(this.task._id, this.updatedTask).subscribe(
      () => {
        this.activeModal.close('taskUpdated');
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }

  onCancel(): void {
    // If user cancels, close the modal
    this.activeModal.dismiss('cancel');
  }
}
