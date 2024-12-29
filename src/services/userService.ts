import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { UserProfile } from '../types/user';

export async function createUserProfile(userId: string, email: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  const userData: Omit<UserProfile, 'id'> = {
    email,
    firstName: '',
    lastName: '',
    role: 'visitor',
    createdAt: new Date().toISOString(),
  };
  
  await setDoc(userRef, userData);
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    return null;
  }

  return {
    id: userDoc.id,
    ...userDoc.data()
  } as UserProfile;
}

export async function updateUserProfile(
  userId: string, 
  data: Partial<Omit<UserProfile, 'id' | 'email' | 'role' | 'createdAt'>>
): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, data);
}