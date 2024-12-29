import { PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function ActivitiesHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-gray-900">Activities</h1>
      <button
        onClick={() => navigate('/activity')}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
        Add Activity
      </button>
    </div>
  );
}