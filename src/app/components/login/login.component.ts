import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const userData = { username: this.username, password: this.password };

    this.http.post<any>('http://localhost/student-api/login.php', userData).subscribe(response => {
      if (response.status === 'success') {
        alert('Login successful');
        this.router.navigate(['/view-students']);
      } else if (response.status === 'wrong_password') {
        alert('Incorrect password');
      } else {
        alert('User not found');
      }
    }, error => {
      alert('Server error');
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  goToReset() {
    this.router.navigate(['/reset']);
  }
  
}
