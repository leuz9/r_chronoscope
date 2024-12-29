import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ActivitySummary from './ActivitySummary';
import TimelineChart from './TimelineChart';
import DeathPrediction from './DeathPrediction';
import QuickActions from './QuickActions';
import { fetchUserActivities } from '../../services/activityService';
import type { Activity } from '../../types';

export default function Dashboard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth() ?? {};
  const navigate = useNavigate();

  useEffect(() => {
    const loadActivities = async () => {
      if (currentUser?.uid) {
        try {
          const userActivities = await fetchUserActivities(currentUser.uid);
          setActivities(userActivities);
        } catch (error) {
          console.error('Error loading activities:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadActivities();
  }, [currentUser]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TimelineChart activities={activities} />
        </div>
        <div>
          <QuickActions onAddActivity={() => navigate('/activity')} />
        </div>
        <div className="lg:col-span-2">
          <ActivitySummary activities={activities} />
        </div>
        <div className="lg:col-span-1">
          <DeathPrediction activities={activities} />
        </div>
      </div>
    </div>
  );
}