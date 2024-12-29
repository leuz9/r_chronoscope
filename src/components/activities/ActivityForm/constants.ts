export const ACTIVITY_CATEGORIES = [
  'Work',
  'Exercise',
  'Sleep',
  'Social',
  'Entertainment',
  'Learning',
  'Other'
] as const;

export const PERIOD_UNITS = [
  { value: 'days', label: 'Days' },
  { value: 'weeks', label: 'Weeks' },
  { value: 'months', label: 'Months' },
  { value: 'years', label: 'Years' }
] as const;