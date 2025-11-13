import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { GlobalDataService } from '../../../services/global-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private globalData: GlobalDataService) 
  {
    this.loginForm = this.fb.group
    (
      {
      mobileNo: ['', Validators.required],
      mPin: ['', Validators.required],
      }
    );
  }

  onLogin(){

    if (this.loginForm.invalid)
    {
      this.errorMessage = 'Please enter all fields'
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { mobileNo, mPin } = this.loginForm.value;

    this.authService.login({ mobileNo, mPin }).subscribe({
      next: (response) => {
        console.log('Login success:', response);

        // Example: If API returns a token, store it in localStorage
        if (response && response.data.value.token) {
          this.globalData.setMobileNo(mobileNo);
          this.globalData.setAuthToken(response.data.value.token);
        }

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = err.error?.message || 'Invalid credentials!';
      },
      complete: () => {
        this.isLoading = false;
      }
    });

  }
}
