export interface ActivityRecommendation {
  activity: string;
  duration: string;
  frequency: string;
  benefits: string[];
}

export interface HealthCategory {
  id: string;
  title: string;
  description: string;
  recommendations: ActivityRecommendation[];
}