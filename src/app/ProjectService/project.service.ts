import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface Task {
  description: string;
  debutdateAffaire: string;
  FindateAffaire: string;
  etat: boolean;
}

interface Project {
  id: number;
  nom: string;
  startDate: string;
  endDate: string;
  idmanager: string;
  valider: boolean;
  taches1: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {}

  createProject(project: Project, managerId: number): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/add/${managerId}`, project);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/all`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/update/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  addTaskToProject(projectId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${projectId}/addTache`, task);
  }

  assignEmployeesToTask(taskId: number, employeeIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${taskId}/assigner-employes`, employeeIds);
  }

  getProjectsByManager(managerId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/byManager/${managerId}`);
  }

  getTasksByProject(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${projectId}/tasks`);
  }

  addTaskWithEmployee(projectId: number, task: Task, employeeId: number): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${projectId}/tasks/assign/${employeeId}`, task);
  }
}
