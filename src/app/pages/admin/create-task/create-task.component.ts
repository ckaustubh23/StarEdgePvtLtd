import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

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
  excelData: any[] = [];

  requiredColumns = [
    'district',
    'tehsil',
    'distributor',
    'vendor',
    'supplier',
    'estimated_cost',
    'estimated_completion_date'
  ];

  constructor(private fb: FormBuilder, private router: Router){
    this.taskForm = this.fb.group({
    taskName: ['', Validators.required],
    state: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  async onSubmit() {
    if (this.taskForm.valid && this.selectedFile) {
      const isValid = await this.validateExcelFile(this.selectedFile);
      if (!isValid) {
        alert('Invalid Excel file: Missing required columns.');
        return;
      }

      const formData = new FormData();
      formData.append('taskName', this.taskForm.get('taskName')?.value);
      formData.append('state', this.taskForm.get('state')?.value);
      formData.append('file', this.selectedFile);

      // console.log('Form submitted:', formData);
      alert('Task created successfully!');

      this.taskForm.reset();
      this.selectedFile = null;
      this.fileName = '';
    } else {
      alert('Please fill all fields and select a valid Excel file.');
    }
  }

  async validateExcelFile(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

        if (jsonData.length === 0) {
          resolve(false);
          return;
        }

        const headers = (jsonData[0] as string[]).map((h) => h?.toString().trim().toLowerCase());
        const missingColumns = this.requiredColumns.filter((col) => !headers.includes(col));
        
        if (missingColumns.length > 0) {
          console.error('Missing columns:', missingColumns);
          resolve(false);
        } else {
          this.excelData = jsonData;
          const headerRow = this.excelData[0].map((h: any) => h.toString().trim());
          const dataRows = this.excelData.slice(1);

          const finalData = dataRows.map((row: any[]) => {
          const obj: any = {};

          headerRow.forEach((key: string, index: number) => {
              obj[key] = row[index];
            });

          return obj;
          });

          localStorage.setItem('taskData', JSON.stringify(finalData));
          console.log('Excel', JSON.stringify(finalData));
          this.router.navigate(['/admin/view task']);
          resolve(true);
        }
      };

      reader.onerror = () => resolve(false);
      reader.readAsArrayBuffer(file);
    });
  }
}
