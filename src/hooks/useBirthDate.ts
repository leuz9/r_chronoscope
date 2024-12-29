import { useCallback } from 'react';
import { calculateAge } from '../utils/dateUtils';

export function useBirthDate() {
  const formatBirthDate = useCallback((birthDate: string | undefined) => {
    if (!birthDate) return 'Not provided';
    return new Date(birthDate).toLocaleDateString();
  }, []);

  const getAge = useCallback((birthDate: string | undefined) => {
    if (!birthDate) return null;
    return calculateAge(new Date(birthDate));
  }, []);

  return { formatBirthDate, getAge };
}