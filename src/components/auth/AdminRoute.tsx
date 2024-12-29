import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isUserAdmin } from '../../services/adminService';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { currentUser } = useAuth() ?? {};

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (currentUser?.uid) {
        const adminStatus = await isUserAdmin(currentUser.uid);
        setIsAdmin(adminStatus);
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, [currentUser]);

  if (loading) {
    return <div>Checking permissions...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}