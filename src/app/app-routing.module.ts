import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/Users/dashboard/dashboard.component';
import { UserFormComponent } from './pages/Users/user-form/user-form.component';
import { CreateTaskComponent } from './pages/admin/create-task/create-task.component';
import { ViewTaskComponent } from './pages/admin/view-task/view-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },    // this sets default
  { path: 'login', component: LoginComponent },  
  {
    path: '',
    component: LayoutComponent, // shared layout
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'createUser', component: UserFormComponent },
      { path: 'admin/create task', component: CreateTaskComponent},
      { path: 'admin/view task', component: ViewTaskComponent}
    ],
  },
  { path: '**', redirectTo: '/login' },    // this is of wildcard means at any given situation and should be the last
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
