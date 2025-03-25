// Angular import
import { Component } from '@angular/core';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

interface Timesheet {
  employee: string;
  weekEnding: string;
  hoursWorked: number;
  status: 'Approved' | 'Rejected' | 'Pending';
}
@Component({
  selector: 'app-typography',
  imports: [CardComponent],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.scss'
})
export class TypographyComponent {

  timesheets: Timesheet[] = [
    {
      employee: 'John Doe',
      weekEnding: '2023-10-07',
      hoursWorked: 40,
      status: 'Pending',
    },
    {
      employee: 'Jane Smith',
      weekEnding: '2023-10-07',
      hoursWorked: 35,
      status: 'Pending',
    },
    {
      employee: 'Alice Johnson',
      weekEnding: '2023-10-07',
      hoursWorked: 45,
      status: 'Approved',
    },
    {
      employee: 'Bob Brown',
      weekEnding: '2023-10-07',
      hoursWorked: 38,
      status: 'Rejected',
    },
  ];

  // Approve a timesheet
  approveTimesheet(timesheet: Timesheet): void {
    timesheet.status = 'Approved';
  }

  // Reject a timesheet
  rejectTimesheet(timesheet: Timesheet): void {
    timesheet.status = 'Rejected';
  }

}
