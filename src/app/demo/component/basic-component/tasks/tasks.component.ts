import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from "../../../../ProjectService/project.service";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
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
    private http: HttpClient
  ) {}

  ngOnInit(): void {
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
    this.http.get<any[]>('http://localhost:8080/api/employees').subscribe({
      next: (employees) => {
        this.employees = employees;
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
  }
  
  // Close the task creation modal
  closeTaskModal(): void {
    this.showTaskModal = false;
  }
  
  // Submit the new task
  submitTask(): void {
    if (!this.projectId || !this.selectedEmployeeId) {
      alert('Veuillez sélectionner un employé');
      return;
    }
    
    // Format dates if needed
    const taskToSubmit = {
      ...this.newTask,
      // Convert Date objects to string in ISO format
      debutdateAffaire: new Date(this.newTask.debutdateAffaire).toISOString(),
      FindateAffaire: new Date(this.newTask.FindateAffaire).toISOString(),
      deadline: new Date(this.newTask.deadline).toISOString()
    };
    
    this.projectService.addTaskWithEmployee(
      this.projectId, 
      taskToSubmit, 
      this.selectedEmployeeId
    ).subscribe({
      next: (response) => {
        console.log('Task added successfully:', response);
        this.closeTaskModal();
        this.loadProjectTasks(); // Reload tasks
      },
      error: (err) => {
        console.error('Error adding task:', err);
        alert('Erreur lors de l\'ajout de la tâche');
      }
    });
  }
}