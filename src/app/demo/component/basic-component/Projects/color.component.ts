import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/ProjectService/project.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Task {
  description: string;
  debutdateAffaire: string;
  FindateAffaire: string;
  etat: boolean;
}

interface Project {
  id: number;
  nom: string;
  startDate: string;
  endDate: string;
  idmanager: string;
  valider: boolean;
  taches1: Task[];
}

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [FormsModule,CommonModule], // You can add other modules here like NzIconModule, CommonModule, etc.
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent implements OnInit {
  projects: Project[] = [];
  showProjectModal = false;
  currentProject: Project = {
    id: 0,
    nom: '',
    startDate: '',
    endDate: '',
    idmanager: '',
    valider: false,
    taches1: [],
  };
  isEditMode = false;
  isLoading = true;

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllProjects();
  }

  loadAllProjects(): void {
    this.isLoading = true;
    this.projectService.getProjects().subscribe({
      next: (projects: Project[]) => {
        this.projects = projects;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.isLoading = false;
      },
    });
  }

  openProjectForm(project?: Project): void {
    this.isEditMode = !!project;
    this.currentProject = project
      ? { ...project }
      : {
          id: 0,
          nom: '',
          startDate: '',
          endDate: '',
          idmanager: '',
          valider: false,
          taches1: [],
        };
    this.showProjectModal = true;
  }
  
  

  handleProjectSubmit(): void {
    console.log('Submitting project:', this.currentProject); // Log the payload
  
    const operation = this.isEditMode
    ? this.projectService.updateProject(this.currentProject.id, this.currentProject)
    : this.projectService.createProject(this.currentProject, Number(this.currentProject.idmanager));
  
    operation.subscribe({
      next: () => {
        this.loadAllProjects();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error saving project:', err);
        alert('Error saving project: ' + (err.message || 'Unknown error'));
      },
    });
    
  }
  
  
  

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => this.loadAllProjects(),
        error: (err) => console.error('Error deleting project:', err),
      });
    }
  }

  closeModal(): void {
    this.showProjectModal = false;
    this.currentProject = {
      id: 0,
      nom: '',
      startDate: '',
      endDate: '',
      idmanager: '',
      valider: false,
      taches1: [],
    };
    this.isEditMode = false;
  }

  enterProject(projectId: number): void {
    this.router.navigate([`/projects/${projectId}/tasks`], {
      queryParams: { projectId: projectId }
    });
  }
}  