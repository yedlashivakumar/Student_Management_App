import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add this
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  retypePassword: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (this.password !== this.retypePassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const user = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost/student-api/register.php', user).subscribe(response => {
      if (response.status === 'exists') {
        this.errorMessage = 'Username already exists.';
      } else if (response.status === 'registered') {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    }, error => {
      this.errorMessage = 'Server error. Please try again later.';
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
