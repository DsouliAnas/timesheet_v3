import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Gestion des employés
  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees`);
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employees`, employee);
  }
  getUserProfile(): Observable<{ name: string, role: string }> {
    return this.http.get<{ name: string, role: string }>(`${this.apiUrl}/user/profile`);
  }

  // Gestion des managers
  getManagers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listmanager`);
  }

  createManager(manager: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createManager`, manager);
  }



  // Gestion des admins
  createAdmin(admin: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createAdmin`, admin);
  }
  updateEmployee(employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/employees/${employee.id}`, employee);
  }
  
  updateManager(manager: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateManager/${manager.id}`, manager);
  }
}