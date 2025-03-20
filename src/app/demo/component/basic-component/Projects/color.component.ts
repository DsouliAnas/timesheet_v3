import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { NzIconModule } from 'ng-zorro-antd/icon';  // Import NzIconModule
import { BookOutline, ClockCircleOutline } from '@ant-design/icons-angular/icons';  // Import specific icons

// Define the Task interface
interface Task {
  description: string;
  deadline: string;
  assignedTo: string;
  completed: boolean;
}

@Component({
  selector: 'app-project-page',
  standalone: true,  // Declare this component as standalone
  imports: [CommonModule, NzIconModule],  // Add the necessary imports
  providers: [
    {
      provide: 'NZ_ICONS',
      useValue: [BookOutline, ClockCircleOutline],
    },
  ],
  templateUrl: './color.component.html',  // Path to your HTML file
  styleUrls: ['./color.component.scss'],  // Path to your SCSS file
})
export class ColorComponent {
  // Static task data
  tasks: Task[] = [
    {
      description: 'Design homepage layout',
      deadline: '2023-10-15',
      assignedTo: 'John Doe',
      completed: false,
    },
    {
      description: 'Develop contact form',
      deadline: '2023-10-20',
      assignedTo: 'Jane Smith',
      completed: true,
    },
    {
      description: 'Optimize website for mobile',
      deadline: '2023-10-25',
      assignedTo: 'Alice Johnson',
      completed: false,
    },
  ];

  // Modal state
  showTaskModal: boolean = false;

  // Task being edited (if any)
  taskToEdit: Task | null = null;

  // New task form data
  newTask: Task = {
    description: '',
    deadline: '',
    assignedTo: '',
    completed: false,
  };

  // Open the task modal
  openTaskModal(): void {
    this.showTaskModal = true;
  }

  // Close the task modal
  closeTaskModal(): void {
    this.showTaskModal = false;
    this.taskToEdit = null; // Reset taskToEdit when closing the modal
    this.resetNewTaskForm(); // Reset the form
  }

  // Reset the new task form
  resetNewTaskForm(): void {
    this.newTask = {
      description: '',
      deadline: '',
      assignedTo: '',
      completed: false,
    };
  }

  // Add a new task
  addTask(): void {
    if (this.newTask.description && this.newTask.deadline && this.newTask.assignedTo) {
      this.tasks.push({ ...this.newTask }); // Add the new task to the list
      this.closeTaskModal(); // Close the modal
    }
  }

  // Edit a task
  editTask(task: Task): void {
    this.taskToEdit = { ...task }; // Set the task to edit
    this.newTask = { ...task }; // Populate the form with the task data
    this.showTaskModal = true; // Open the modal
  }

  // Save the edited task
  saveEditedTask(): void {
    if (this.taskToEdit) {
      const index = this.tasks.findIndex(
        (t) => t.description === this.taskToEdit?.description
      );
      if (index !== -1) {
        this.tasks[index] = { ...this.newTask }; // Update the task in the list
      }
      this.closeTaskModal(); // Close the modal
    }
  }

  // Delete a task
  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter((t) => t.description !== task.description);
  }

  // Submit the form (add or edit task)
  submitTask(): void {
    if (this.taskToEdit) {
      this.saveEditedTask(); // Save the edited task
    } else {
      this.addTask(); // Add a new task
    }
  }
}