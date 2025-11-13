import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

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
    taskName: ['', Validators.required],
    state: ['', Validators.required]
    });
  }

  onFileSelect(event: any){
    const file = event.target.files[0];
    
    if(file){
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (fileType === 'xls' || fileType === 'xlsx') {
        this.selectedFile = file;
        this.fileName = file.name;
        this.fileError = '';
      } else {
        this.fileError = 'Please upload a valid Excel file (.xls or .xlsx)';
        this.selectedFile = null;
        this.fileName = '';
      }
    }
  }

  onSubmit(){
    if (this.taskForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('taskName', this.taskForm.get('taskName')?.value);
      formData.append('state', this.taskForm.get('state')?.value);
      formData.append('file', this.selectedFile);

      console.log('Form submitted:', formData);
      alert('Task created successfully!');
      this.taskForm.reset();
      this.selectedFile = null;
      this.fileName = '';
    }
  }
}
