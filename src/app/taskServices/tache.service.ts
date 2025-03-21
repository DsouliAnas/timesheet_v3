import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the interfaces directly in this file
export interface Task {
  id: number;
  description: string;
  deadline: string;
  debutdateAffaire: string;
  FindateAffaire: string;
  etat: boolean;
  employes?: Employee[]; // Optional array of employees
}

export interface Employee {
  id: number;
  nom: string;
  prenom: string;
}

@Injectable({
  providedIn: 'root',
})
export class TacheService {
  private apiUrl = 'http://localhost:8080/api/managers/AllListTaches';

  constructor(private http: HttpClient) {}

  // Fetch all tasks from the backend
  getAllTaches(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Add a new task
  createTache(task: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:8080/api/managers/addtaches', task);
  }

  // Update an existing task
  updateTache(task: Task): Observable<Task> {
    return this.http.put<Task>(`http://localhost:8080/api/managers/updateTaches/${task.id}`, task);
  }

  // Delete a task
  deleteTache(taskId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/managers/deleteTaches/${taskId}`);
  }

  // Fetch employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:8080/api/employees');
  }
}