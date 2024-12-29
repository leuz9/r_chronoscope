import { UseFormRegister } from 'react-hook-form';
import type { ProfileFormData } from './types';

interface BirthDateFieldProps {
  register: UseFormRegister<ProfileFormData>;
  error?: string;
}

export default function BirthDateField({ register, error }: BirthDateFieldProps) {
  return (
    <div>
      <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
        Birth Date
      </label>
      <input
        type="date"
        {...register('birthDate')}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}