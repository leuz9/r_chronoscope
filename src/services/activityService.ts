import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Activity } from '../types';

export async function fetchUserActivities(userId: string): Promise<Activity[]> {
  const activitiesRef = collection(db, 'activities');
  const q = query(activitiesRef, where('userId', '==', userId));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Activity[];
}

export async function addActivity(activity: Omit<Activity, 'id'>): Promise<void> {
  const activitiesRef = collection(db, 'activities');
  await addDoc(activitiesRef, activity);
}

export async function updateActivity(id: string, data: Partial<Omit<Activity, 'id'>>): Promise<void> {
  const activityRef = doc(db, 'activities', id);
  await updateDoc(activityRef, data);
}

export async function deleteActivity(id: string): Promise<void> {
  const activityRef = doc(db, 'activities', id);
  await deleteDoc(activityRef);
}