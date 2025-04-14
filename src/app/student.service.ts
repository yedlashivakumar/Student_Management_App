import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
    apiURL = 'http://localhost/student-api/students.php';
  
    constructor(private http: HttpClient) {}
  
    getStudents(page: number = 1) {
      const params = new HttpParams().set('page', page);
      return this.http.get<any>(this.apiURL, { params });
    }
  
    addStudent(formData: FormData) {
      return this.http.post(this.apiURL, formData);
    }
  
    updateStudent(formData: FormData) {
      return this.http.post(`${this.apiURL}?_method=PUT`, formData);
    }
  
    deleteStudent(id: number) {
        const body = new HttpParams().set('id', id.toString());
        return this.http.request('DELETE', this.apiURL, {
          headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
          body: body.toString()
        });
      }
      
  }
  