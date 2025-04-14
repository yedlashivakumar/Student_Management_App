// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ViewStudentsComponent } from './components/view-students/view-students.component';
import { ResetComponent } from './components/reset/reset.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'view-students', component: ViewStudentsComponent },
  { path: 'reset', component: ResetComponent }
];