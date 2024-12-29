import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { getUserProfile } from '../../../services/userService';
import type { UserProfile as UserProfileType } from '../../../types/user';

export default function UserProfile() {
  const { currentUser } = useAuth() ?? {};
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (currentUser?.uid) {
        const profile = await getUserProfile(currentUser.uid);
        setUserProfile(profile);
      }
    };

    loadUserProfile();
  }, [currentUser]);

  if (!userProfile) {
    return null;
  }

  return (
    <Link to="/profile" className="flex items-center px-2 py-3 text-sm hover:bg-gray-700 rounded-md group">
      <div className="flex-shrink-0">
        {userProfile.photoURL ? (
          <img
            className="h-8 w-8 rounded-full"
            src={userProfile.photoURL}
            alt={`${userProfile.firstName} ${userProfile.lastName}`}
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {userProfile.firstName?.[0]}{userProfile.lastName?.[0]}
            </span>
          </div>
        )}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-white">
          {userProfile.firstName} {userProfile.lastName}
        </p>
        <p className="text-xs text-gray-400">{userProfile.email}</p>
      </div>
    </Link>
  );
}