import type { HealthCategory } from './types';

export const HEALTH_RECOMMENDATIONS: HealthCategory[] = [
  {
    id: 'physical-activity',
    title: 'Physical Activity',
    description: 'Regular physical activity is crucial for maintaining good health and increasing life expectancy.',
    recommendations: [
      {
        activity: 'Moderate aerobic exercise',
        duration: '30 minutes',
        frequency: '5 days per week',
        benefits: [
          'Reduces risk of cardiovascular disease',
          'Improves mental health',
          'Helps maintain healthy weight'
        ]
      },
      {
        activity: 'Strength training',
        duration: '20-30 minutes',
        frequency: '2-3 days per week',
        benefits: [
          'Builds muscle mass',
          'Improves bone density',
          'Increases metabolism'
        ]
      },
      {
        activity: 'Walking',
        duration: '30-60 minutes',
        frequency: 'Daily',
        benefits: [
          'Low-impact cardiovascular exercise',
          'Improves circulation',
          'Reduces stress'
        ]
      }
    ]
  },
  {
    id: 'sleep',
    title: 'Sleep Hygiene',
    description: 'Quality sleep is essential for physical and mental recovery, and cognitive function.',
    recommendations: [
      {
        activity: 'Night sleep',
        duration: '7-9 hours',
        frequency: 'Daily',
        benefits: [
          'Enhances memory consolidation',
          'Supports immune system',
          'Improves emotional regulation'
        ]
      },
      {
        activity: 'Relaxation before bed',
        duration: '30-60 minutes',
        frequency: 'Daily',
        benefits: [
          'Helps transition to sleep',
          'Reduces anxiety',
          'Improves sleep quality'
        ]
      }
    ]
  },
  {
    id: 'social',
    title: 'Social Connection',
    description: 'Maintaining strong social bonds is linked to better health outcomes and longer life.',
    recommendations: [
      {
        activity: 'Social gatherings',
        duration: '2-3 hours',
        frequency: 'Weekly',
        benefits: [
          'Reduces loneliness',
          'Provides emotional support',
          'Strengthens community bonds'
        ]
      },
      {
        activity: 'Family time',
        duration: '1-2 hours',
        frequency: 'Daily',
        benefits: [
          'Strengthens relationships',
          'Creates support system',
          'Improves mental well-being'
        ]
      }
    ]
  },
  {
    id: 'mental',
    title: 'Mental Well-being',
    description: 'Taking care of mental health is as important as physical health for longevity.',
    recommendations: [
      {
        activity: 'Meditation',
        duration: '15-20 minutes',
        frequency: 'Daily',
        benefits: [
          'Reduces stress',
          'Improves focus',
          'Enhances emotional balance'
        ]
      },
      {
        activity: 'Learning/Hobbies',
        duration: '1 hour',
        frequency: '3-4 times per week',
        benefits: [
          'Keeps mind active',
          'Provides sense of achievement',
          'Reduces risk of cognitive decline'
        ]
      }
    ]
  }
];