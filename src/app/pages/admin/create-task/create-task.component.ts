import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  taskForm: FormGroup;
  states = ['Maharashtra', 'Gujrat', 'Andra Predesh', 'Telangana', 'Goa'];
  selectedFile: File | null = null;
  fileName: string = '';
  fileError: string = '';


  constructor(private fb: FormBuilder){
    this.taskForm = this.fb.group({
      
    });
  }
  onSubmit(){

  }
}
