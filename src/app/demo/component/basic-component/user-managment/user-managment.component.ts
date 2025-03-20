import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-managment',
  imports: [FormsModule,CommonModule],
  templateUrl: './user-managment.component.html',
  styleUrl: './user-managment.component.scss'
})
export class UserManagmentComponent {

  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Manager' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Employee' },
  ];

  // Modal state
  showUserModal: boolean = false;

  // User being edited (if any)
  userToEdit: User | null = null;

  // New user form data
  newUser: User = {
    id: 0,
    name: '',
    email: '',
    role: 'Employee',
  };

  // Open the user modal
  openUserModal(): void {
    this.showUserModal = true;
  }

  // Close the user modal
  closeUserModal(): void {
    this.showUserModal = false;
    this.userToEdit = null; // Reset userToEdit when closing the modal
    this.resetNewUserForm(); // Reset the form
  }

  // Reset the new user form
  resetNewUserForm(): void {
    this.newUser = {
      id: 0,
      name: '',
      email: '',
      role: 'Employee',
    };
  }

  // Add a new user
  addUser(): void {
    if (this.newUser.name && this.newUser.email && this.newUser.role) {
      this.newUser.id = this.users.length + 1; // Generate a new ID
      this.users.push({ ...this.newUser }); // Add the new user to the list
      this.closeUserModal(); // Close the modal
    }
  }

  // Edit a user
  editUser(user: User): void {
    this.userToEdit = { ...user }; // Set the user to edit
    this.newUser = { ...user }; // Populate the form with the user data
    this.showUserModal = true; // Open the modal
  }

  // Save the edited user
  saveEditedUser(): void {
    if (this.userToEdit) {
      const index = this.users.findIndex((u) => u.id === this.userToEdit?.id);
      if (index !== -1) {
        this.users[index] = { ...this.newUser }; // Update the user in the list
      }
      this.closeUserModal(); // Close the modal
    }
  }

  // Delete a user
  deleteUser(user: User): void {
    this.users = this.users.filter((u) => u.id !== user.id);
  }

  // Submit the form (add or edit user)
  submitUserForm(): void {
    if (this.userToEdit) {
      this.saveEditedUser(); // Save the edited user
    } else {
      this.addUser(); // Add a new user
    }
  }

}
