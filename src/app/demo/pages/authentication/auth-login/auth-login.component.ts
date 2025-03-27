import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'], // Correction ici (styleUrls)
})
export class AuthLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.email || !this.password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        const role = this.authService.getUserRole();
        console.log('User role:', role, `(Stored as: ${localStorage.getItem('role')})`);

        this.redirectUser(role);
      },
      error: (error) => {
        alert('Email ou mot de passe incorrect.');
        console.error('Échec de la connexion :', error);
      },
    });
  }

  private redirectUser(role: string): void {
    const routes: Record<string, string> = {
      admin: '/dashboard/default',
      manager: '/manager/dashboard',
      employee: '/employee/timesheet',
    };

    if (routes[role]) {
      this.router.navigate([routes[role]]);
    } else {
      console.error('Rôle inconnu:', role);
    }
  }
}
