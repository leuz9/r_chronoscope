import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth() ?? {};

  const handleLogout = async () => {
    try {
      await logout?.();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md group"
    >
      <ArrowLeftOnRectangleIcon
        className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300"
        aria-hidden="true"
      />
      Sign out
    </button>
  );
}