import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string; role: string; data: Record<string, unknown> }> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: { token: string; role: string; data: Record<string, unknown> }) => {
        if (response.token && response.role) {
          localStorage.setItem('token', response.token);
          // Normalize the role to lowercase before storing
          localStorage.setItem('role', response.role.toLowerCase()); // Save in lowercase
          
          const userKey = response.role + 'Data'; // e.g., 'managerData'
          localStorage.setItem(userKey, JSON.stringify(response.data));
        } else {
          console.error('Login response missing token or role', response);
        }
      })
    );
  }

  logout(): void {
    // Remove authentication data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('adminData');
    localStorage.removeItem('employeData');
    localStorage.removeItem('managerData');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get the user role and normalize it (lowercase)
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
