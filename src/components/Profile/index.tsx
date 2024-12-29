import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ProfileInfo from './ProfileInfo';
import ProfileActions from './ProfileActions';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth() ?? {};
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout?.();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>
        {error && (
          <div className="mb-4 text-sm text-red-600">{error}</div>
        )}
        <div className="bg-white shadow rounded-lg">
          <ProfileInfo user={currentUser} />
          <ProfileActions onLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
}