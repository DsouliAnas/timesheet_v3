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
    HttpClientModule 
  ],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  private readonly iconService = inject(IconService);
  private readonly router = inject(Router); 

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
      url: '/profile/view', 
    }
  ];

  setting = [
    {
      icon: 'question-circle',
      title: 'Support',
      url: '/support', 
    },
    {
      icon: 'user',
      title: 'Account Settings',
      url: '/settings/account',  
    },

  ];

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  navigateToProfile() {

    this.router.navigate(['/manager/profile']);

}

}
