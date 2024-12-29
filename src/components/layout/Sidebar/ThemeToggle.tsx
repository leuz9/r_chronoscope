import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-full flex items-center px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md group"
    >
      {theme === 'light' ? (
        <MoonIcon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" />
      ) : (
        <SunIcon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" />
      )}
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
}