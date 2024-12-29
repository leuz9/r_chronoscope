import { PlusIcon, ChartBarIcon, UserIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  onAddActivity: () => void;
}

export default function QuickActions({ onAddActivity }: QuickActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="space-y-4">
        <button
          onClick={onAddActivity}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Activity
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <UserIcon className="h-5 w-5 mr-2" />
          View Profile
        </button>
      </div>
    </div>
  );
}