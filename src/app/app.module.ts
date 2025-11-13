import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './pages/Users/user-form/user-form.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/Users/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CreateTaskComponent } from './pages/admin/create-task/create-task.component';
import { ViewTaskComponent } from './pages/admin/view-task/view-task.component';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    RegisterComponent,
    CreateTaskComponent,
    ViewTaskComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
