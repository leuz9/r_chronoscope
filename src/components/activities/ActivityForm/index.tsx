import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { addActivity } from '../../../services/activityService';
import ActivityFormFields from './ActivityFormFields';
import type { ActivityFormData } from './types';

export default function ActivityForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth() ?? {};

  const handleSubmit = async (data: ActivityFormData) => {
    try {
      setError('');
      setLoading(true);
      
      if (!currentUser?.uid) {
        throw new Error('User not authenticated');
      }

      await addActivity({
        userId: currentUser.uid,
        ...data,
        createdAt: new Date().toISOString()
      });

      navigate('/');
    } catch (err) {
      setError('Failed to save activity');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Activity</h1>
        {error && (
          <div className="mb-4 text-sm text-red-600">{error}</div>
        )}
        <div className="bg-white shadow rounded-lg">
          <ActivityFormFields onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
}