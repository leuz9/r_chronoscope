import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { UserProfile, UserRole } from '../types/user';

export async function fetchAllUsers(): Promise<UserProfile[]> {
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as UserProfile[];
}

export async function updateUserRole(userId: string, role: UserRole): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { role });
}

export async function isUserAdmin(userId: string): Promise<boolean> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() && userDoc.data()?.role === 'admin';
}