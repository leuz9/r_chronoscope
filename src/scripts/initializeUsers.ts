import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { UserProfile } from '../types/user';

const initialUsers: Omit<UserProfile, 'id'>[] = [
  {
    email: 'admin@chronoscope.com',
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    email: 'user@chronoscope.com',
    role: 'user',
    createdAt: new Date().toISOString()
  },
  {
    email: 'visitor@chronoscope.com',
    role: 'visitor',
    createdAt: new Date().toISOString()
  }
];

export async function initializeUsers() {
  try {
    for (const userData of initialUsers) {
      // Create a custom ID based on the email (removing @ and .)
      const userId = userData.email.replace(/[@.]/g, '_');
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, userData);
      console.log(`Created user: ${userData.email}`);
    }
    console.log('Users initialized successfully');
  } catch (error) {
    console.error('Error initializing users:', error);
  }
}