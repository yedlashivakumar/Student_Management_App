import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})

export class ResetComponent {
  username: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  resetPassword() {
    const user = {
      username: this.username,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };

    this.http.post<any>('http://localhost/student-api/reset.php', user).subscribe(response => {
      if (response.status === 'success') {
        alert('Password updated successfully');
        this.router.navigate(['/login']);
      } else if (response.status === 'incorrect') {
        this.errorMessage = 'Incorrect current password.';
      } else {
        this.errorMessage = 'Something went wrong. Try again.';
      }
    }, error => {
      this.errorMessage = 'Server error.';
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
