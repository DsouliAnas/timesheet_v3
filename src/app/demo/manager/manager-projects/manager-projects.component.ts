import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/ProjectService/project.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  nom: string;
  startDate: string;
  endDate: string;
  idmanager: string;
  valider: boolean;
  taches1: any[];
}

@Component({
  selector: 'app-manager-projects',
  imports: [FormsModule, CommonModule],
  templateUrl: './manager-projects.component.html',
  styleUrls: ['./manager-projects.component.scss']
})
export class ManagerProjectsComponent implements OnInit {
  projects: Project[] = [];
  managerId = 4;  // Set the manager ID dynamically (you can get it from the logged-in user)
  
  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjectsByManager(this.managerId).subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }

  goToTasks(projectId: number): void {
    this.router.navigate(['/manager/projects', projectId, 'tasks'], { queryParams: { projectId } });
  }
}
