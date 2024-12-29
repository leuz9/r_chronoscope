export type PeriodUnit = 'days' | 'weeks' | 'months' | 'years';

export interface ActivityFormData {
  category: string;
  description: string;
  duration: number;
  date: string;
  isPeriodic: boolean;
  periodicity?: number;
  periodUnit?: PeriodUnit;
}