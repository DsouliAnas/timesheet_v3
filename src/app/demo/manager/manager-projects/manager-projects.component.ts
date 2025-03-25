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
  idmanager: string;  // Ensure the ID is a string for consistency
  valider: boolean;
  taches1: Task[];
}

@Component({
  selector: 'app-manager-projects',
  imports: [FormsModule, CommonModule], // Add other necessary modules here
  templateUrl: './manager-projects.component.html',
  styleUrls: ['./manager-projects.component.scss']
})
export class ManagerProjectsComponent  {
}