import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  adminMenuOpen = false;

  constructor(private router: Router) {}

  toggleAdminMenu(){
    this.adminMenuOpen = !this.adminMenuOpen;
  }

  closeAdminMenu(){
    this.adminMenuOpen = false;
  }

  logout() {
    var a = confirm('Are you sure you want to logout ??');
    if (a){
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/dashboard']);
    }
    
  }
}
