import type { Activity } from '../types';

export function calculateTotalTime(activities: Activity[]) {
  return activities.reduce((acc, activity) => {
    const { category, duration } = activity;
    acc[category] = (acc[category] || 0) + duration;
    return acc;
  }, {} as Record<string, number>);
}