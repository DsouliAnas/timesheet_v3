export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'dashboard', // Corrected icon
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'dashboard', // Corrected to standard dashboard icon
        breadcrumbs: false
      }
    ]
  },
  
  {
    id: 'utilities',
    title: 'UI Components',
    type: 'group',
    icon: 'widgets', // General UI components icon
    children: [
      {
        id: 'projects',
        title: 'Projects',
        type: 'item',
        classes: 'nav-item',
        url: '/projects',
        icon: 'Books', // Projects typically use a folder icon
      },
      {
        id: 'color',
        title: 'Timesheet Approvals',
        type: 'item',
        classes: 'nav-item',
        url: '/color',
        icon: 'clock', // Approval-related icon
      },
      {
        id: 'tabler',
        title: 'User Management',
        type: 'item',
        classes: 'nav-item',
        url: '/User_Management',
        icon: 'user', // User management uses a group icon
      },
      {
        id: 'profile',
        title: 'Profile',
        type: 'item',
        classes: 'nav-item',
        url: '/profile',
        icon: 'user', // Approval-related icon
      },
      
    ]
  }
];
