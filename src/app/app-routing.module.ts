import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './auth/guards/role.guard';  // Import your Role Guard

import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';
import { ManagerLayoutComponent } from './theme/layouts/manager-layout/manager-layout.component'; // Import Manager Layout
import { EmployeeLayoutComponent } from '../app/theme/layouts/Employee_layout/employee-layout.component'; // Import Employee Layout

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: GuestLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./demo/pages/authentication/auth-login/auth-login.component').then((c) => c.AuthLoginComponent)
      }
    ]
  },
  // Admin Routes
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'dashboard/default', loadComponent: () => import('./demo/component/dashboard/default.component').then((c) => c.DefaultComponent) },
      { path: 'projects', loadComponent: () => import('./demo/component/Projects/color.component').then((c) => c.ColorComponent) },
      { path: 'color', loadComponent: () => import('./demo/component/timesheet_approval/typography.component').then((c) => c.TypographyComponent) },
      { path: 'notifications', loadComponent: () => import('./demo/component/notifications/sample-page.component').then((c) => c.SamplePageComponent) },
      { path: 'User_Management', loadComponent: () => import('./demo/component/user-managment/user-managment.component').then((c) => c.UserManagmentComponent) },
      { path: 'profile', loadComponent: () => import('./demo/component/profile/profile.component').then((c) => c.ProfileComponent) },
      { path: 'projects/:id/tasks', loadComponent: () => import('./demo/component/tasks/tasks.component').then((c) => c.TasksComponent) }
    ]
  },
  // Manager Routes
  {
    path: 'manager',
    component: ManagerLayoutComponent, 
    children: [
      { path: 'dashboard', loadComponent: () => import('./demo/manager/manager-dashboard/manager-dashboard.component').then((c) => c.ManagerDashboardComponent) },
      { path: 'profile', loadComponent: () => import('./demo/manager/manager-profile/manager-profile.component').then((c) => c.ManagerProfileComponent) },
      { path: 'timesheet', loadComponent: () => import('./demo/manager/manager-timesheet/manager-timesheet.component').then((c) => c.ManagerTimesheetComponent) },
      { path: 'projects', loadComponent: () => import('./demo/manager/manager-projects/manager-projects.component').then((c) => c.ManagerProjectsComponent) },

    ]
  },
  {
    path: 'employee',
    component: EmployeeLayoutComponent,  
    children: [
      {path: 'profile',loadComponent: () => import('./demo/Employee/employee-profile/employee-profile.component').then((c) => c.EmployeeProfileComponent),},
      {path: 'timesheet',loadComponent: () => import('./demo/Employee/employee-timesheet/employee-timesheet.component').then((c) => c.EmployeeTimesheetComponent),}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
