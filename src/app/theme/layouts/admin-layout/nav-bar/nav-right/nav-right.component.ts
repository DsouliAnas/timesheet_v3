import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { IconService, IconDirective } from '@ant-design/icons-angular';

import {
  BellOutline,
  SettingOutline,
  GiftOutline,
  MessageOutline,
  PhoneOutline,
  CheckCircleOutline,
  LogoutOutline,
  EditOutline,
  UserOutline,
  ProfileOutline,
  WalletOutline,
  QuestionCircleOutline,
  LockOutline,
  CommentOutline,
  UnorderedListOutline,
  ArrowRightOutline,
  GithubOutline,
  BookOutline,
  ClockCircleOutline
} from '@ant-design/icons-angular/icons';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-nav-right',
  imports: [
    IconDirective,
    RouterModule,
    NgScrollbarModule,
    NgbNavModule,
    NgbDropdownModule,
    HttpClientModule // Ensure this is included
  ],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  private readonly iconService = inject(IconService);
  private readonly router = inject(Router); // Inject Router

  windowWidth: number;
  screenFull: boolean = true;

  constructor() {
    this.windowWidth = window.innerWidth;
    this.iconService.addIcon(
      ...[CheckCircleOutline, GiftOutline, MessageOutline, SettingOutline, PhoneOutline, LogoutOutline, 
        UserOutline, EditOutline, ProfileOutline, QuestionCircleOutline, LockOutline, CommentOutline, 
        UnorderedListOutline, ArrowRightOutline, BellOutline, GithubOutline, WalletOutline, BookOutline, ClockCircleOutline]
    );
  }

  profile = [
    {
      icon: 'user',
      title: 'View Profile',
      url: '/profile/view',  // Added URL
    },
    
  ];

  setting = [
    {
      icon: 'question-circle',
      title: 'Support',
      url: '/support',  // Added URL
    },
    {
      icon: 'user',
      title: 'Account Settings',
      url: '/settings/account',  // Added URL
    },
    {
      icon: 'lock',
      title: 'Privacy Center',
      url: '/settings/privacy',  // Added URL
    },
    {
      icon: 'comment',
      title: 'Feedback',
      url: '/feedback',  // Added URL
    },
    {
      icon: 'unordered-list',
      title: 'History',
      url: '/history',  // Added URL
    }
  ];

  // Method to navigate when a link is clicked
  navigateTo(url: string) {
    this.router.navigate([url]); // Use Router to navigate to the desired URL
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  navigateToProfile() {

      this.router.navigate(['/profile']);
  
  }
  

}
