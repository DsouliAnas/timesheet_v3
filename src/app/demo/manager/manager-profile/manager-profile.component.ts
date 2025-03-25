import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './manager-profile.component.html',
  styleUrl: './manager-profile.component.scss'
})
export class ManagerProfileComponent implements OnInit {
  profileForm!: FormGroup;
  profileImage: string = 'https://via.placeholder.com/150'; // Default profile image

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['anas', Validators.required],
      email: ['john.doe@gmail.com', [Validators.required, Validators.email]],
      location: ['manager'],
      bio: ['Software Developer | Angular Enthusiast'],
    });
  }

  // Handle profile image upload
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.profileImage = e.target.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Profile Updated:', this.profileForm.value);
      alert('Profile updated successfully!');
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  // Handle cancel button click
  onCancel(): void {
    this.profileForm.reset({
      name: 'Anas',
      email: 'john.doe@gmail.com',
      location: 'manager',
      bio: 'Software Developer | Angular Enthusiast',
    });
    this.profileImage = 'https://via.placeholder.com/150';
  }
}