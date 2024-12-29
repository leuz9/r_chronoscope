import { useLocation } from 'react-router-dom';
import { useIsAdmin } from '../../../hooks/useIsAdmin';
import SidebarLink from './SidebarLink';
import UserProfile from './UserProfile';
import LogoutButton from './LogoutButton';
import ThemeToggle from '../ThemeToggle';
import { SIDEBAR_LINKS } from './constants';

export default function Sidebar() {
  const location = useLocation();
  const { isAdmin } = useIsAdmin();

  const filteredLinks = SIDEBAR_LINKS.filter(link => 
    link.path !== '/admin' || isAdmin
  );

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-gray-800 dark:bg-gray-900">
        <div className="flex items-center flex-shrink-0 px-4 py-5">
          <h1 className="text-xl font-bold text-white">Chronoscope</h1>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <nav className="flex-1 px-2 space-y-1">
            {filteredLinks.map((link) => (
              <SidebarLink
                key={link.path}
                {...link}
                active={location.pathname === link.path}
              />
            ))}
          </nav>
          <div className="flex-shrink-0 border-t border-gray-700">
            <div className="px-2 pt-4 pb-2">
              <UserProfile />
            </div>
            <div className="px-2 py-2">
              <ThemeToggle />
            </div>
            <div className="px-2 py-2">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}