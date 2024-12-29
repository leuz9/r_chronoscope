import { Link } from 'react-router-dom';
import { classNames } from '../../../utils/styling';
import type { SidebarLinkProps } from './types';

export default function SidebarLink({ icon: Icon, label, path, active }: SidebarLinkProps) {
  return (
    <Link
      to={path}
      className={classNames(
        active
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
      )}
    >
      <Icon
        className={classNames(
          active ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
          'mr-3 flex-shrink-0 h-6 w-6'
        )}
        aria-hidden="true"
      />
      {label}
    </Link>
  );
}