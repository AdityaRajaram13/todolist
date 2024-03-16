import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:4000/api'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserTasks(): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.baseUrl}/usertask`, { headers });
  }

  deleteTask(taskId: string): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.baseUrl}/delete/${taskId}`, { headers });
  }

  updateTask(taskId: string, taskData: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.baseUrl}/update/${taskId}`, taskData, { headers });
  }
}
