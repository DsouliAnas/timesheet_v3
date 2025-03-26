import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string; role: string; data: Record<string, unknown> }> {
    return this.http.post<{ token: string; role: string; data: Record<string, unknown> }>(
      `${this.apiUrl}/login`, 
      { email, password }
    ).pipe(
      tap((response) => {
        console.log('Login response:', response); // Log the entire response to check its structure

        if (response.token && response.role) {
          localStorage.setItem('token', response.token);
          const normalizedRole = response.role.toLowerCase(); // Ensure lowercase role
          console.log('Normalized role:', normalizedRole); // Check normalized role

          localStorage.setItem('role', normalizedRole);

          // Store user-specific data using lowercase role key
          const userKey = `${normalizedRole}Data`; 
          console.log('Storing user data with key:', userKey); // Log the user data key
          localStorage.setItem(userKey, JSON.stringify(response.data));
        } else {
          console.error('Login response missing token or role', response);
        }
      })
    );
  }

  logout(): void {
    // Remove authentication data from localStorage
    console.log('Logging out, removing items from localStorage');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('adminData');
    localStorage.removeItem('employeData');
    localStorage.removeItem('managerData');
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Getting token from localStorage:', token);
    return token;
  }

  getUserRole(): string {
    const role = localStorage.getItem('role') || '';
  
    // Normalize "employe" to "employee"
    if (role.toLowerCase() === 'employe') {
      return 'employee';
    }
  
    return role.toLowerCase(); // Keep other roles as they are
  }
  
  

  getUserData(): Record<string, unknown> | null {
    const role = this.getUserRole();
    if (!role) {
      console.log('No role found in localStorage');
      return null;
    }
    
    const userKey = `${role}Data`;
    const userData = localStorage.getItem(userKey);
    console.log('Getting user data from localStorage with key:', userKey); // Log user data key
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    console.log('Is user logged in?', !!token); // Log if the user is logged in based on token
    return !!token;
  }
}
