import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-students.component.html'
})
export class ViewStudentsComponent implements OnInit {
  students: any[] = [];
  totalPages: number[] = [];
  page: number = 1;
  maxPage: number = 0;
  visiblePages: number[] = [];

  showForm = false;
  isEdit = false;
  form: any = {};
  selectedFile: File | null = null;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents(this.page).subscribe(res => {
      this.students = res.data;
      const total = Math.ceil(res.total / 10);
      this.totalPages = Array.from({ length: total }, (_, i) => i + 1);
      this.getPagesToShow();
    });
  }

  getPagesToShow(): void {
    const total = this.totalPages.length;
    const visibleCount = 5;
    let start = Math.max(this.page - Math.floor(visibleCount / 2), 1);
    let end = start + visibleCount - 1;

    if (end > total) {
      end = total;
      start = Math.max(end - visibleCount + 1, 1);
    }

    this.visiblePages = this.totalPages.slice(start - 1, end);
  }

  changePage(p: number): void {
    if (p >= 1 && p <= this.totalPages.length) {
      this.page = p;
      this.fetchStudents();
    }
  }

  openAddStudent(): void {
    this.showForm = true;
    this.isEdit = false;
    this.form = {};
    this.selectedFile = null;
  }

  editStudent(student: any): void {
    this.form = { ...student };
    this.isEdit = true;
    this.showForm = true;
    this.selectedFile = null;
  }

  deleteStudent(id: number): void {
    if (confirm("Are you sure?")) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          alert("Deleted successfully");
          this.fetchStudents();
        },
        error: (err) => {
          console.error("Delete failed", err);
          alert("Failed to delete");
        }
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 2 * 1024 * 1024) {
      this.selectedFile = file;
    } else {
      alert('Only JPG/PNG files under 2MB allowed.');
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.form.name || '');
    formData.append('email', this.form.email || '');
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    if (this.isEdit && this.form.id) {
      formData.append('id', String(this.form.id));
      this.studentService.updateStudent(formData).subscribe({
        next: () => {
          this.showForm = false;
          this.fetchStudents();
          alert('Student updated successfully!');
        },
        error: (err) => {
          console.error('Update Error:', err);
          alert('Failed to update student.');
        }
      });
    } else {
      this.studentService.addStudent(formData).subscribe({
        next: () => {
          this.showForm = false;
          this.fetchStudents();
          alert('Student added successfully!');
        },
        error: (err) => {
          console.error('Add Error:', err);
          alert('Failed to add student.');
        }
      });
    }
  }

  cancel(): void {
    this.showForm = false;
  }

  logout(): void {
    // Example logic: clear token or session and redirect
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
