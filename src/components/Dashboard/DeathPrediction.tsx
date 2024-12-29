import { useMemo, useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserProfile } from '../../services/userService';
import { Activity } from '../../types';
import { calculateLifeExpectancy } from '../../utils/lifeExpectancy';

interface DeathPredictionProps {
  activities: Activity[];
}

export default function DeathPrediction({ activities }: DeathPredictionProps) {
  const { currentUser } = useAuth() ?? {};
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (currentUser?.uid) {
        const profile = await getUserProfile(currentUser.uid);
        setUserProfile(profile);
      }
    };
    loadUserProfile();
  }, [currentUser]);

  const lifestyleFactors = useMemo(() => {
    const weeklyActivities = activities.filter(
      activity => new Date(activity.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );

    const exerciseHours = weeklyActivities
      .filter(a => a.category === 'Exercise')
      .reduce((sum, a) => sum + Number(a.duration), 0);

    const sleepHours = weeklyActivities
      .filter(a => a.category === 'Sleep')
      .reduce((sum, a) => sum + Number(a.duration), 0);

    const socialHours = weeklyActivities
      .filter(a => a.category === 'Social')
      .reduce((sum, a) => sum + Number(a.duration), 0);

    return {
      exerciseHoursPerWeek: exerciseHours,
      sleepHoursPerDay: (sleepHours / 7),
      socialHoursPerWeek: socialHours
    };
  }, [activities]);

  const prediction = useMemo(() => {
    return calculateLifeExpectancy(userProfile?.birthDate, lifestyleFactors);
  }, [lifestyleFactors, userProfile?.birthDate]);

  if (!prediction.formattedDeathDateTime) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Life Expectancy Prediction</h2>
        <p className="text-sm text-gray-500">
          Please set your birth date in your profile to see your prediction.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Life Expectancy Prediction</h2>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Based on your activity patterns and scientific research:
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-600">Weekly Exercise</span>
            <p className="font-medium">{Number(lifestyleFactors.exerciseHoursPerWeek).toFixed(1)} hours</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Daily Sleep</span>
            <p className="font-medium">{Number(lifestyleFactors.sleepHoursPerDay).toFixed(1)} hours</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Weekly Social Activity</span>
            <p className="font-medium">{Number(lifestyleFactors.socialHoursPerWeek).toFixed(1)} hours</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Predicted Lifespan</span>
            <p className="font-medium">{prediction.predictedAge} years</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-800">
            Predicted date and time of death:
          </p>
          <p className="text-sm text-indigo-600 mt-1">
            {prediction.formattedDeathDateTime}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Note: This is a simplified prediction based on activity patterns and general research.
            Many other factors affect life expectancy.
          </p>
        </div>
      </div>
    </div>
  );
}