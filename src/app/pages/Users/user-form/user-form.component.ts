import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm: FormGroup;
  showForm = false;

  roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'logistics', label: 'Logistics' },
    { value: 'distributor', label: 'Distributor' },
    { value: 'vendor', label: 'Vendor' },
    { value: 'support', label: 'Support' }
  ];

  users: any[] = [
  { firstName: 'Kaustubh', lastName: 'Chaubey', email: 'kaustubh@example.com', mobileNo: '9876543210', gender: 'Male', role: 'Admin', city: 'Mumbai' },
  { firstName: 'Dev', lastName: 'Chaubey', email: 'dev@example.com', mobileNo: '9123456780', gender: 'Male', role: 'Vendor', city: 'Pune' },
  { firstName: 'Amit', lastName: 'Patel', email: 'amit.patel@example.com', mobileNo: '9890012345', gender: 'Male', role: 'User', city: 'Ahmedabad' },
  { firstName: 'Priya', lastName: 'Sharma', email: 'priya.sharma@example.com', mobileNo: '9823456789', gender: 'Female', role: 'Manager', city: 'Delhi' },
  { firstName: 'Rohit', lastName: 'Mehta', email: 'rohit.mehta@example.com', mobileNo: '9871234560', gender: 'Male', role: 'Vendor', city: 'Surat' },
  { firstName: 'Sneha', lastName: 'Iyer', email: 'sneha.iyer@example.com', mobileNo: '9867891234', gender: 'Female', role: 'Admin', city: 'Chennai' },
  { firstName: 'Karan', lastName: 'Malhotra', email: 'karan.malhotra@example.com', mobileNo: '9812345670', gender: 'Male', role: 'User', city: 'Bengaluru' },
  { firstName: 'Anjali', lastName: 'Desai', email: 'anjali.desai@example.com', mobileNo: '9845123456', gender: 'Female', role: 'Vendor', city: 'Vadodara' },
  { firstName: 'Vikas', lastName: 'Gupta', email: 'vikas.gupta@example.com', mobileNo: '9800011223', gender: 'Male', role: 'Admin', city: 'Mumbai' },
  { firstName: 'Nisha', lastName: 'Rao', email: 'nisha.rao@example.com', mobileNo: '9834567890', gender: 'Female', role: 'Manager', city: 'Hyderabad' },
  { firstName: 'Manish', lastName: 'Verma', email: 'manish.verma@example.com', mobileNo: '9798765432', gender: 'Male', role: 'Vendor', city: 'Indore' },
  { firstName: 'Ravi', lastName: 'Joshi', email: 'ravi.joshi@example.com', mobileNo: '9811122233', gender: 'Male', role: 'Manager', city: 'Mumbai' },
  { firstName: 'Sahil', lastName: 'Tiwari', email: 'sahil.bansal@example.com', mobileNo: '9876501234', gender: 'Male', role: 'Vendor', city: 'Chandigarh' },
  { firstName: 'Aditya', lastName: 'Singh', email: 'aditya.singh@example.com', mobileNo: '9819988776', gender: 'Male', role: 'Manager', city: 'Kanpur' },
  { firstName: 'Vivek', lastName: 'Tiwari', email: 'vivek.tiwari@example.com', mobileNo: '9887766554', gender: 'Male', role: 'User', city: 'Bhopal' },
  { firstName: 'Arjun', lastName: 'Nair', email: 'arjun.nair@example.com', mobileNo: '9898989898', gender: 'Male', role: 'Admin', city: 'Thiruvananthapuram' },
];


  filteredRoles = [...this.roles];
  searchText: string = '';
  filteredUsers: any[] = [];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.minLength(10)]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userForm.get('gender')?.valueChanges.subscribe(gender => {
      if (gender === 'female'){
        this.filteredRoles = this.roles.filter(r => r.value != 'vendor' && r.value != 'distributor');
      }
      else{
        this.filteredRoles = [...this.roles];
      }

      // Reset 'role' if currently invalid
      const selectedRole = this.userForm.get('role')?.value;
      if (!this.filteredRoles.some(r => r.value === selectedRole)) {
        this.userForm.get('role')?.reset('');
      }
    })

    this.filteredUsers = [...this.users];
  }

  filterUsers(){
    const text = this.searchText.toLowerCase().trim();

    this.filteredUsers = this.users.filter((user) =>
      Object.values(user).some((val) =>
        String(val).toLowerCase().includes(text)
      )
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.showForm = false;
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.users.push(this.userForm.value);
      this.userForm.reset();
      this.showForm = false;
    }
  }
}
