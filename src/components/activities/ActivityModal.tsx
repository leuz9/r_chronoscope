import { Dialog } from '@headlessui/react';
import ActivityForm from './ActivityForm';
import type { Activity } from '../../types';

interface ActivityModalProps {
  activity: Activity;
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit';
}

export default function ActivityModal({ activity, isOpen, onClose, mode }: ActivityModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-xl w-full bg-white rounded-lg">
          <Dialog.Title className="text-lg font-medium text-gray-900 p-6 border-b">
            {mode === 'view' ? 'View Activity' : 'Edit Activity'}
          </Dialog.Title>

          {mode === 'view' ? (
            <div className="p-6">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="mt-1 text-sm text-gray-900">{activity.category}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900">{activity.description}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(activity.date).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Duration</dt>
                  <dd className="mt-1 text-sm text-gray-900">{activity.duration} hours</dd>
                </div>
              </dl>
            </div>
          ) : (
            <ActivityForm 
              initialData={activity}
              onSuccess={onClose}
              mode="edit"
            />
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}