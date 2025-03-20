import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from 'src/app/auth/auth.service'; // Correct path based on the folder structure
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth-login',
  imports :[FormsModule,HttpClientModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss',
})
export class AuthLoginComponent {
  // Form fields
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {} // Inject AuthService and Router

  // Login method
  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        const role = this.authService.getUserRole(); // Get the user's role from local storage
        console.log('User role:', role); // Debugging line

        // Check the role and navigate accordingly
        if (role === 'admin') {
          this.router.navigate(['/dashboard/default']); // Navigate to admin dashboard
        } else if (role === 'manager') {
          this.router.navigate(['/manager']); // Navigate to manager's page
        } else if (role === 'employe') {
          this.router.navigate(['/employe']); // Navigate to employee's page
        } else {
          console.error('Unknown role:', role); // Handle unexpected roles
        }
      },
      error: (error) => {
        alert('Invalid email or password');
        console.error('Login failed:', error); // Handle login failure
      },
    });
  }
}