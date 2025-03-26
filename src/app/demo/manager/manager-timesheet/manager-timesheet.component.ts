import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { FullCalendarComponent } from '@fullcalendar/angular'; // For @ViewChild reference
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TacheService } from '../../../taskServices/tache.service';
import { TaskDetailsDialogComponent } from '../task-details-dialog/task-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // Import the module

@Component({
  selector: 'app-manager-timesheet',
  standalone: true, // Mark the component as standalone
  imports: [MatIconModule,CommonModule,DragDropModule,FullCalendarModule,],
  templateUrl: './manager-timesheet.component.html',
  styleUrl: './manager-timesheet.component.scss'
})
export class ManagerTimesheetComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  tasks: any[] = [];
  selectedTask: any = null;

  constructor(
    private readonly http: HttpClient,
    private dialog: MatDialog,
    private tacheService: TacheService
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.tacheService.getAllTaches().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  showTaskDetails(task: any) {
    this.dialog.open(TaskDetailsDialogComponent, {
      data: task,
      width: '400px'
    });
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    droppable: true,
    events: [
      { title: 'Meeting with Team', date: '2025-02-11', backgroundColor: '#FF5733' },
      { title: 'Complete Timesheet', date: '2025-02-12', backgroundColor: '#33FF57' }
    ],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    drop: this.handleTaskDrop.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
  };

  handleDateClick(arg: any) {
    alert('Date clicked: ' + arg.dateStr);
  }

  handleEventClick(arg: any) {
    alert('Event clicked: ' + arg.event.title);
  }

  handleTaskDrop(event: any) {
    const taskName = event.draggedEl.innerText;
    const date = event.dateStr;

    this.calendarComponent.getApi().addEvent({
      title: taskName,
      date: date,
      backgroundColor: '#3498db',
    });
  }

  onTaskDrop(event: CdkDragDrop<any>) {
    const task = event.item.data;
    const taskDate = new Date().toISOString().split('T')[0];

    this.calendarComponent.getApi().addEvent({
      title: task.name,
      date: taskDate,
      backgroundColor: '#3498db',
      extendedProps: { task },
    });

    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  handleEventDrop(event: any) {
    const { event: droppedEvent } = event;
    alert('Event dropped: ' + droppedEvent.title);
  }

  changeView(view: string): void {
    this.calendarComponent.getApi().changeView(view);
  }

  goToToday(): void {
    this.calendarComponent.getApi().today();
  }
}