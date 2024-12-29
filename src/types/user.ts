export type UserRole = 'visitor' | 'user' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  photoURL?: string;
  birthDate?: string;
  role: UserRole;
  createdAt: string;
  lastLoginAt?: string;
}

export interface UserStats {
  totalActivities: number;
  totalDuration: number;
  lastActivityDate?: string;
}