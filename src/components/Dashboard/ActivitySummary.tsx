import { useMemo } from 'react';
import type { Activity } from '../../types';
import { calculateTotalTime } from '../../utils/timeCalculations';

interface ActivitySummaryProps {
  activities: Activity[];
}

export default function ActivitySummary({ activities }: ActivitySummaryProps) {
  const totalTime = useMemo(() => calculateTotalTime(activities), [activities]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Activity Summary</h2>
      <div className="space-y-4">
        {Object.entries(totalTime).map(([category, time]) => (
          <div key={category} className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">{category}</span>
            <span className="font-medium text-gray-900 dark:text-white">{time} hours</span>
          </div>
        ))}
      </div>
    </div>
  );
}