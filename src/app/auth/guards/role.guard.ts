import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';  // Assuming you have an AuthService to manage user authentication

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRole = localStorage.getItem('userRole');  // Retrieve the role from localStorage
    const expectedRole = route.data['role'];  // Get the expected role from the route configuration

    if (userRole === expectedRole) {
      return true;
    } else {
      // If role doesn't match, redirect to a specific page (e.g., unauthorized or login)
      this.router.navigate(['/unauthorized']);  // You can customize this route as needed
      return false;
    }
  }
}
