import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

@Component({
  selector: 'app-sample-page',
  imports: [CommonModule, CardComponent],
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export class SamplePageComponent {

  notifications: Notification[] = [
    {
      id: 1,
      title: 'Task Completed',
      message: 'The task "Design homepage layout" has been completed.',
      timestamp: '2023-10-10 10:30 AM',
      read: false,
    },
    {
      id: 2,
      title: 'Timesheet Approved',
      message: 'Your timesheet for the week ending 2023-10-07 has been approved.',
      timestamp: '2023-10-09 03:15 PM',
      read: true,
    },
    {
      id: 3,
      title: 'New Task Assigned',
      message: 'A new task "Develop contact form" has been assigned to you.',
      timestamp: '2023-10-08 09:00 AM',
      read: false,
    },
    {
      id: 4,
      title: 'Timesheet Rejected',
      message: 'Your timesheet for the week ending 2023-10-07 has been rejected.',
      timestamp: '2023-10-07 05:45 PM',
      read: true,
    },
  ];

  // Mark a notification as read
  markAsRead(notification: Notification): void {
    notification.read = true;
  }

  // Delete a notification
  deleteNotification(notification: Notification): void {
    this.notifications = this.notifications.filter((n) => n.id !== notification.id);
  }
  
}
