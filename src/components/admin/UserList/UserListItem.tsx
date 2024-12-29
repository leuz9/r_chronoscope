import { useState } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { updateUserRole } from '../../../services/adminService';
import type { UserProfile, UserRole } from '../../../types/user';

interface UserListItemProps {
  user: UserProfile;
}

export default function UserListItem({ user }: UserListItemProps) {
  const [role, setRole] = useState(user.role);
  const [updating, setUpdating] = useState(false);

  const handleRoleChange = async (newRole: UserRole) => {
    try {
      setUpdating(true);
      await updateUserRole(user.id, newRole);
      setRole(newRole);
    } catch (error) {
      console.error('Failed to update user role:', error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <li>
      <div className="px-4 py-4 flex items-center sm:px-6">
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserIcon className="h-12 w-12 text-gray-400" />
            </div>
            <div className="ml-4">
              <p className="font-medium text-indigo-600 truncate">{user.email}</p>
              <p className="mt-1 text-sm text-gray-500">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-5">
            <select
              value={role}
              onChange={(e) => handleRoleChange(e.target.value as UserRole)}
              disabled={updating}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="visitor">Visitor</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>
    </li>
  );
}