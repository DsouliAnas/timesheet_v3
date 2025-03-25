import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../../AdminService/admin.service';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./user-managment.component.scss'],
})
export class UserManagmentComponent implements OnInit {
  users: User[] = [];
  showUserModal: boolean = false;
  userToEdit: User | null = null;
  newUser: User = { id: 0, name: '', email: '', role: 'Employee' };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();  // Load users from the backend
  }

  // Load users from the backend
  loadUsers(): void {
    this.adminService.getEmployees().subscribe(
      (data) => {
        this.users = data;  // Assuming the data returned is in the correct format
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching users', error);
      }
    );
  }

  // Open the user modal
  openUserModal(): void {
    this.showUserModal = true;
  }

  // Close the user modal
  closeUserModal(): void {
    this.showUserModal = false;
    this.userToEdit = null;
    this.resetNewUserForm();
  }

  // Reset the new user form
  resetNewUserForm(): void {
    this.newUser = { id: 0, name: '', email: '', role: 'Employee' };
  }

  // Add a new user (send to backend)
  addUser(): void {
    if (this.newUser.name && this.newUser.email && this.newUser.role) {
      this.adminService.createEmployee(this.newUser).subscribe(
        (data) => {
          this.users.push(data);  // Add the new user to the list
          this.closeUserModal();
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding user', error);
        }
      );
    }
  }

  // Edit a user
  editUser(user: User): void {
    this.userToEdit = { ...user };
    this.newUser = { ...user };  // Populate the form with the user's data
    this.showUserModal = true;
  }

  // Save the edited user
  saveEditedUser(): void {
    if (this.userToEdit) {
      this.adminService.updateEmployee(this.newUser).subscribe(
        (updatedUser) => {
          const index = this.users.findIndex((u) => u.id === this.userToEdit?.id);
          if (index !== -1) {
            this.users[index] = updatedUser;  // Update the user in the list
          }
          this.closeUserModal();
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating user', error);
        }
      );
    }
  }

  // Delete a user (send to backend)
  deleteUser(user: User): void {
    this.adminService.deleteEmployee(user.id).subscribe(
      () => {
        this.users = this.users.filter((u) => u.id !== user.id);
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting user', error);
      }
    );
  }

  // Submit the form (add or edit user)
  submitUserForm(): void {
    if (this.userToEdit) {
      this.saveEditedUser();  // Save the edited user
    } else {
      this.addUser();  // Add a new user
    }
  }
}
