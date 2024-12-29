import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { fetchUserActivities } from '../../../services/activityService';
import ActivitiesHeader from './ActivitiesHeader';
import ActivityListItem from './ActivityListItem';
import type { Activity } from '../../../types';

export default function ActivitiesList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth() ?? {};

  const loadActivities = async () => {
    if (currentUser?.uid) {
      try {
        const userActivities = await fetchUserActivities(currentUser.uid);
        setActivities(userActivities.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ));
      } catch (error) {
        console.error('Error loading activities:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadActivities();
  }, [currentUser]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ActivitiesHeader />
      
      {loading ? (
        <div className="text-center py-4">Loading activities...</div>
      ) : activities.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No activities found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <ActivityListItem 
              key={activity.id} 
              activity={activity}
              onActivityUpdated={loadActivities}
            />
          ))}
        </div>
      )}
    </div>
  );
}