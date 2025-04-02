import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import this!

@Component({
  selector: 'app-typography',
  imports: [CommonModule], // ✅ Add this line
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss'] // Fixed
})
export class TypographyComponent implements OnInit {
  timesheets = [
    { id: 1, employee: 'john_doe', hours: 40, status: 'pending' },
    { id: 2, employee: 'jane_smith', hours: 35, status: 'approved' },
  ];

  constructor() { }

  ngOnInit(): void {
    console.log('TypographyComponent initialized');
  }

  approveTimesheet(timesheetId: number): void {
    this.timesheets = this.timesheets.map(timesheet => 
      timesheet.id === timesheetId ? { ...timesheet, status: 'approved' } : timesheet
    );
  }

  rejectTimesheet(timesheetId: number): void {
    this.timesheets = this.timesheets.map(timesheet => 
      timesheet.id === timesheetId ? { ...timesheet, status: 'rejected' } : timesheet
    );
  }
}
