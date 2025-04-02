import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// User profile interface
export interface UserProfile {
  name: string;
  email: string;
  location?: string;
  department?: string;
  role?: string;
  prenom?: string;
  nom?: string; // Last name
  profileImage?: string; // Optional profile image
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private readonly http: HttpClient) {}

  // Login method
  login(email: string, password: string): Observable<{ token: string; role: string; data: UserProfile }> {
    return this.http.post<{ token: string; role: string; data: UserProfile }>(
      `${this.apiUrl}/login`,
      { email, password }
    ).pipe(
      tap((response) => {
        if (response.token && response.role && response.data) {
          localStorage.setItem('token', response.token);
          const normalizedRole = response.role.toLowerCase();
          localStorage.setItem('role', normalizedRole);
          localStorage.setItem('userId', response.data.email); // Store user ID (email) for API calls
          localStorage.setItem('userData', JSON.stringify(response.data)); // Store user profile data
        }
      })
    );
  }

  // Logout method
  logout(): void {
    localStorage.clear(); // Clears all stored data at once
  }

  // Retrieve stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Retrieve user role
  getUserRole(): string {
    return localStorage.getItem('role') || '';
  }

  // Retrieve user profile data
  getUserData(): UserProfile | null {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
