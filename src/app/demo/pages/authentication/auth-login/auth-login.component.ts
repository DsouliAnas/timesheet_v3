import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth-login',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss',
})
export class AuthLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        const role = this.authService.getUserRole(); // Get role from storage
        console.log('User role:', role);

        // Redirect based on role
        switch (role) {
          case 'admin':
            this.router.navigate(['/dashboard/default']);
            break;
          case 'manager':
            this.router.navigate(['/manager/dashboard']); // Redirect to manager dashboard
            break;
          case 'employe':
            this.router.navigate(['/employee/timesheet']); // Redirect to employee dashboard
            break;
          default:
            console.error('Unknown role:', role);
        }
      },
      error: (error) => {
        alert('Invalid email or password');
        console.error('Login failed:', error);
      },
    });
  }
}
