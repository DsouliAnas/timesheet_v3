import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface UserProfile {
  prenom: string;
  name: string;
  email: string;
  location?: string;
  department?: string;
  role?: string;
  profileImage?: string;
  bio?: string;
  lastPasswordChange?: Date | string;
}

@Component({
  selector: 'app-profile',
  imports : [ReactiveFormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileImage: string = 'assets/images/default-avatar.jpg';
  editMode: boolean = false;
  lastPasswordChange: Date = new Date();

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.fb.group({
      prenom: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: [''],
      department: [''],
      role: [''],
      bio: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userData = this.authService.getUserData() as UserProfile;
    if (userData) {
      this.profileForm.patchValue(userData);
      this.profileImage = userData.profileImage || this.profileImage;
      this.lastPasswordChange = userData.lastPasswordChange ? new Date(userData.lastPasswordChange) : new Date();
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }
  openPasswordModal(): void {
    // Logic to open the password modal
    console.log('Password modal opened');
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      this.profileImage = URL.createObjectURL(file);
    }
  }
  

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Form submitted:', this.profileForm.value);
    }
  }

  onCancel(): void {
    this.editMode = false;
  }

  showError(field: string): boolean {
    const fieldControl = this.profileForm.get(field);
    return fieldControl ? fieldControl.invalid && fieldControl.touched : false;
  }
}
