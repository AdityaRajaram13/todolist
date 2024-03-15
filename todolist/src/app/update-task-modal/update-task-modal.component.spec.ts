import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskModalComponent } from './update-task-modal.component';

describe('UpdateTaskModalComponent', () => {
  let component: UpdateTaskModalComponent;
  let fixture: ComponentFixture<UpdateTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTaskModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
