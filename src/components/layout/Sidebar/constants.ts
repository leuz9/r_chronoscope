import { HomeIcon, ClockIcon, PlusIcon, UserIcon, UsersIcon, HeartIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import type { SidebarLink } from './types';

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: HomeIcon,
  },
  {
    label: 'Activities',
    path: '/activities',
    icon: ClockIcon,
  },
  {
    label: 'Add Activity',
    path: '/activity',
    icon: PlusIcon,
  },
  {
    label: 'Health Advice',
    path: '/health-advice',
    icon: HeartIcon,
  },
  {
    label: 'Worldometer',
    path: '/worldometer',
    icon: GlobeAltIcon,
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: UserIcon,
  },
  {
    label: 'Admin',
    path: '/admin',
    icon: UsersIcon,
  },
];