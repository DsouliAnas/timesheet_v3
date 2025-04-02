import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { AdminService } from 'src/app/AdminService/admin.service'; // Import your service
import { CommonModule } from '@angular/common';

import {
  BellOutline, SettingOutline, GiftOutline, MessageOutline, PhoneOutline, 
  CheckCircleOutline, LogoutOutline, EditOutline, UserOutline, ProfileOutline, 
  WalletOutline, QuestionCircleOutline, LockOutline, CommentOutline, 
  UnorderedListOutline, ArrowRightOutline, GithubOutline, BookOutline, ClockCircleOutline
} from '@ant-design/icons-angular/icons';

import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [
    IconDirective,
    NgbNavModule,
    NgbDropdownModule,
    NgScrollbarModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  private readonly iconService = inject(IconService);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly userService = inject(AdminService);

  userName: string = 'Loading...';
  userRole: string = 'Loading...';
  windowWidth: number = window.innerWidth;
  screenFull: boolean = true;

  constructor() {
    this.iconService.addIcon(
      ...[CheckCircleOutline, GiftOutline, MessageOutline, SettingOutline, PhoneOutline, 
        LogoutOutline, UserOutline, EditOutline, ProfileOutline, QuestionCircleOutline, 
        LockOutline, CommentOutline, UnorderedListOutline, ArrowRightOutline, 
        BellOutline, GithubOutline, WalletOutline, BookOutline, ClockCircleOutline]
    );
  }

  ngOnInit(): void {
    this.fetchUserProfile(); // Load user data on component init
  }

  profile = [
    { icon: 'user', title: 'View Profile', url: '/profile/view' }
  ];

// Update the settings array
setting = [
  { icon: 'user', title: 'Account Settings', url: '/settings/account' }
];


  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  navigateToNotifications() {
    this.router.navigate(['/notifications']);
  }

  fetchUserProfile(): void {
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
  
    if (!role || !userId) {
      console.error('User role or ID is missing from localStorage');
      this.userName = 'Anas';
      this.userRole = 'Admin';
      return;
    }
  
    let apiUrl = '';
    switch (role) {
      case 'ADMIN': 
        apiUrl = `http://localhost:8080/api/admins/${userId}`; 
        break;
      case 'MANAGER': 
        apiUrl = `http://localhost:8080/api/managers/${userId}`; 
        break;
      case 'EMPLOYE': 
        apiUrl = `http://localhost:8080/api/employees/${userId}`; 
        break;
      default:
        console.error('Invalid user role');
        this.userName = 'Anas';
        this.userRole = 'Admin';
        return;
    }
  
    this.http.get<{ name?: string; fullName?: string; username?: string }>(apiUrl).subscribe({
      next: (userData) => {
        // Adjust these property names based on your actual API response
        this.userName = userData.name || userData.fullName || userData.username || 'Unknown';
        this.userRole = role;
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
        this.userName = 'Error loading name';
        this.userRole = role;
      }
    });
  }
}
