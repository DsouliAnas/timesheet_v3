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
    icon: 'dashboard',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/manager/dashboard',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  
  {
    id: 'utilities',
    title: 'UI Components',
    type: 'group',
    icon: 'widgets',
    children: [

      {
        id: 'timesheet',
        title: 'Timesheet',
        type: 'item',
        classes: 'nav-item',
        url: '/manager/timesheet', // ✅ Corrected URL
        icon: 'event_note', // ✅ Updated to a relevant Material icon
      },
      {
        id: 'projects',
        title: 'Projects',
        type: 'item',
        classes: 'nav-item',
        url: '/manager/projects', // ✅ Changed "Profile" to lowercase "profile"
        icon: 'account_circle', // ✅ Changed icon to a valid Material icon
      }
      
    ]
  }
];

