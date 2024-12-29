import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { getUserProfile } from '../../services/userService';
import ProfileForm from './ProfileForm';
import BirthDateDisplay from './BirthDateDisplay';
import type { UserProfile } from '../../types/user';

interface ProfileInfoProps {
  user: User | null;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const loadUserProfile = async () => {
    if (user?.uid) {
      try {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, [user]);

  if (loading) {
    return <div className="px-4 py-5 sm:p-6">Loading profile...</div>;
  }

  if (!userProfile) {
    return <div className="px-4 py-5 sm:p-6">Profile not found</div>;
  }

  return (
    <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
      {isEditing ? (
        <ProfileForm 
          profile={userProfile} 
          onUpdate={() => {
            setIsEditing(false);
            loadUserProfile();
          }} 
        />
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              {userProfile.photoURL ? (
                <img
                  src={userProfile.photoURL}
                  alt={`${userProfile.firstName} ${userProfile.lastName}`}
                  className="h-16 w-16 rounded-full"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl text-gray-500">
                    {userProfile.firstName?.[0]}{userProfile.lastName?.[0]}
                  </span>
                </div>
              )}
              <div className="ml-4">
                <h2 className="text-xl font-semibold">
                  {userProfile.firstName} {userProfile.lastName}
                </h2>
                <p className="text-gray-500">{userProfile.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          </div>

          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Birth Date</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <BirthDateDisplay birthDate={userProfile.birthDate} />
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900">{userProfile.phone || 'Not provided'}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize
                  ${userProfile.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                    userProfile.role === 'user' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                  {userProfile.role}
                </span>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Member since</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(userProfile.createdAt).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </>
      )}
    </div>
  );
}