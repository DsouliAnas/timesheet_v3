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
    id: 'utilities',
    title: 'Components',
    type: 'group',
    icon: 'widgets',
    children: [

      {
        id: 'timesheet',
        title: 'Timesheet',
        type: 'item',
        classes: 'nav-item',
        url: '/employee/timesheet', // ✅ Corrected URL
        icon: 'event_note', // ✅ Updated to a relevant Material icon
      }
      
    ]
  }
];

