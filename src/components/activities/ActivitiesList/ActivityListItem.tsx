import { useState } from 'react';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteActivity } from '../../../services/activityService';
import ActivityModal from '../ActivityModal';
import type { Activity } from '../../../types';

interface ActivityListItemProps {
  activity: Activity;
  onActivityUpdated: () => void;
}

export default function ActivityListItem({ activity, onActivityUpdated }: ActivityListItemProps) {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        setDeleting(true);
        await deleteActivity(activity.id);
        onActivityUpdated();
      } catch (error) {
        console.error('Error deleting activity:', error);
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{activity.category}</h3>
            <p className="text-sm text-gray-500">{activity.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(activity.date).toLocaleDateString()} - {activity.duration} hours
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowViewModal(true)}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <EyeIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowEditModal(true)}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="p-2 text-red-400 hover:text-red-500 disabled:opacity-50"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <ActivityModal
        activity={activity}
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        mode="view"
      />

      <ActivityModal
        activity={activity}
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          onActivityUpdated();
        }}
        mode="edit"
      />
    </>
  );
}