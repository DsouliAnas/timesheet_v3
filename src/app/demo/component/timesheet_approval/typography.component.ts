// Angular import
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.scss'
})
export class TypographyComponent implements OnInit {
  timesheets = [
    { id: 1, employee: 'john_doe', hours: 40, status: 'pending' },
    { id: 2, employee: 'jane_smith', hours: 35, status: 'approved' },
    // More timesheet data
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialization logic can be added here if needed
    console.log('TypographyComponent initialized');
  }

  approveTimesheet(timesheetId: number): void {
    // Logic to approve timesheet
    this.timesheets = this.timesheets.map(timesheet => 
      timesheet.id === timesheetId ? { ...timesheet, status: 'approved' } : timesheet
    );
  }

  rejectTimesheet(timesheetId: number): void {
    // Logic to reject timesheet
    this.timesheets = this.timesheets.filter(timesheet => timesheet.id !== timesheetId);
  }
}
