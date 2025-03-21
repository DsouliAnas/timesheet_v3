import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',  // Redirect the default route to login
    pathMatch: 'full'  // Ensure that the full path is matched
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
  
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'projects',
        loadComponent: () => import('./demo/component/basic-component/Projects/color.component').then((c) => c.ColorComponent)
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/component/basic-component/timesheet_approval/typography.component').then((c) => c.TypographyComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./demo/component/basic-component/notifications/sample-page.component').then((c) => c.SamplePageComponent)
      },
      {
        path: 'User_Management',
        loadComponent: () => import('./demo/component/basic-component/user-managment/user-managment.component').then((c) => c.UserManagmentComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./demo/component/basic-component/profile/profile.component').then((c) => c.ProfileComponent)
      },
      {
        path: 'projects/:id/tasks',
        loadComponent: () => import('../app/demo/component/basic-component/tasks/tasks.component').then((c) => c.TasksComponent)
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
