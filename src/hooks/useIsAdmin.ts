import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { isUserAdmin } from '../services/adminService';

export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
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

  return { isAdmin, loading };
}