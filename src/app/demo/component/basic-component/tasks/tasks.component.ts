import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from "../../../../ProjectService/project.service";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TacheService } from '../../../../taskServices/tache.service'; // Ensure correct import

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'] // Fixed the styleUrl to styleUrls
})
export class TasksComponent implements OnInit {
  projectId: number | null = null;
  projectDetails: any = null;
  tasks: any[] = [];
  employees: any[] = [];
  isLoading = true;
  showTaskModal = false;

  // New task form model
  newTask = {
    description: '',
    debutdateAffaire: '',
    FindateAffaire: '',
    deadline: '',
    etat: false
  };

  selectedEmployeeId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private tacheService: TacheService, // Added TacheService for task operations
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Subscribe to query params to fetch the projectId from the URL
    this.route.queryParams.subscribe(params => {
      this.projectId = params['projectId'] ? Number(params['projectId']) : null;

      if (this.projectId) {
        this.loadProjectDetails();
        this.loadProjectTasks();
        this.loadEmployees();
      }
    });
  }

  loadProjectDetails(): void {
    if (!this.projectId) return;

    this.projectService.getProjectById(this.projectId).subscribe({
      next: (project) => {
        this.projectDetails = project;
      },
      error: (err) => {
        console.error('Error loading project details:', err);
      }
    });
  }

  loadProjectTasks(): void {
    if (!this.projectId) return;

    this.isLoading = true;
    this.projectService.getTasksByProject(this.projectId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.isLoading = false;
      }
    });
  }

  // Load all employees for the dropdown
  loadEmployees(): void {
    this.tacheService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        console.log('Employees loaded:', this.employees);  // Log the loaded employees
      },
      error: (err) => {
        console.error('Error loading employees:', err);
      }
    });
  }
  

  // Open the task creation modal
  openTaskModal(): void {
    this.showTaskModal = true;
    // Reset form
    this.newTask = {
      description: '',
      debutdateAffaire: '',
      FindateAffaire: '',
      deadline: '',
      etat: false
    };
    this.selectedEmployeeId = null;
    console.log("Task modal opened");
  }

  // Close the task creation modal
  closeTaskModal(): void {
    this.showTaskModal = false;
    console.log("Task modal closed");
  }

  // Submit the new task
  submitTask(): void {
    console.log('Submit task clicked');
    if (!this.projectId || !this.selectedEmployeeId) {
      alert('Veuillez sélectionner un employé');
      console.log('No employee selected or project ID missing');
      return;
    }

    const taskToSubmit = {
      ...this.newTask,
      debutdateAffaire: new Date(this.newTask.debutdateAffaire).toISOString(),
      FindateAffaire: new Date(this.newTask.FindateAffaire).toISOString(),
      deadline: new Date(this.newTask.deadline).toISOString()
    };

    console.log('Task data:', taskToSubmit);

    // Call the service to add the task with the selected employee
    this.projectService.addTaskWithEmployee(this.projectId, taskToSubmit, this.selectedEmployeeId).subscribe({
      next: (response) => {
        console.log('Task added successfully:', response);
        this.closeTaskModal();
        this.loadProjectTasks(); // Reload tasks after adding the new one
      },
      error: (err) => {
        console.error('Error adding task:', err);
        alert('Erreur lors de l\'ajout de la tâche');
      }
    });
  }
}
