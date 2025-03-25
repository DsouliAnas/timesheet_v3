import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details-dialog',
  templateUrl: './task-details-dialog.component.html',
  imports: [MatDialogModule,CommonModule],
  styleUrls: ['./task-details-dialog.component.scss']
})
export class TaskDetailsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TaskDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    console.log(data);
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
