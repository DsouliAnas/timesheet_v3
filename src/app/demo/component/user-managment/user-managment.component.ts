import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AdminService } from '../../../AdminService/admin.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule here
import { CommonModule } from '@angular/common';  // Import CommonModule

// Define User interface for type safety
interface User {
  id?: number;
  prenom: string;
  nom: string;
  email: string;
  password?: string;
  role: 'employee' | 'manager' | 'admin';
  departement: string;
}

@Component({
  selector: 'app-user-managment',
  standalone: true,
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.scss'],
  imports: [FormsModule, CommonModule],  // Ensure both FormsModule and CommonModule are imported
})
export class UserManagmentComponent implements OnInit {
  users: User[] = []; // Type users as User[]
  showModal = false;
  isEditMode = false;
  currentUserId: number | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  newUser: User = {  // Type newUser as User
    prenom: '',
    nom: '',
    email: '',
    password: '',
    role: 'employee',
    departement: '',
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.adminService.getEmployees().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (employees: User[]) => {  // Type employees as User[]
        const employeeUsers = employees.map(e => ({ ...e, role: 'employee' as User['role'] }));
        
        this.adminService.getManagers().subscribe((managers: User[]) => {  // Type managers as User[]
          const managerUsers = managers.map(m => ({ ...m, role: 'manager' as User['role'] }));
          this.users = [...employeeUsers, ...managerUsers];
        });
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des utilisateurs';
        console.error(err);
      }
    });
  }

  createUser(): void {
    this.showModal = true;
    this.isEditMode = false;
    this.newUser = {
      prenom: '',
      nom: '',
      email: '',
      password: '',
      role: 'employee',
      departement: '',
    };
  }

  editUser(user: User): void {  // Type user as User
    this.isEditMode = true;
    this.currentUserId = user.id;
    this.newUser = {
      prenom: user.prenom,
      nom: user.nom,
      email: user.email,
      password: '', // Password intentionally left blank
      role: user.role,
      departement: user.departement,
    };
    this.showModal = true;
  }

  submitForm(): void {
    if (!this.validateForm()) return;

    const userData: User = {
      ...this.newUser,
      ...(this.isEditMode && { id: this.currentUserId }),
    };

    let request;

    if (this.isEditMode) {
      request = this.updateUser(userData);
    } else {
      request = this.createNewUser(userData);
    }

    request.subscribe({
      next: () => {
        this.loadUsers();
        this.closeModal();
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la sauvegarde';
        console.error(err);
      },
    });
  }

  private createNewUser(userData: User) {  // Type userData as User
    switch (userData.role) {
      case 'manager':
        return this.adminService.createManager(userData);
      case 'admin':
        return this.adminService.createAdmin(userData);
      default:
        return this.adminService.createEmployee(userData);
    }
  }

  private updateUser(userData: User) {  // Type userData as User
    switch (userData.role) {
      case 'manager':
        return this.adminService.updateManager(userData);
      case 'admin':
        // Implement updateAdmin if necessary
        throw new Error('Mise à jour admin non implémentée');
      default:
        return this.adminService.updateEmployee(userData);
    }
  }

 

  closeModal(): void {
    this.showModal = false;
    this.isEditMode = false;
    this.currentUserId = null;
    this.newUser = {
      prenom: '',
      nom: '',
      email: '',
      password: '',
      role: 'employee',
      departement: '',
    };
  }

  private validateForm(): boolean {
    const requiredFields = ['prenom', 'nom', 'email', 'role', 'departement'];
    const isValid = requiredFields.every(field => !!this.newUser[field]);

    if (!isValid) {
      this.errorMessage = 'Tous les champs obligatoires doivent être remplis';
      return false;
    }

    if (!this.isEditMode && !this.newUser.password) {
      this.errorMessage = 'Le mot de passe est requis';
      return false;
    }

    return true;
  }
}
