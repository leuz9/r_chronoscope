import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { PERIOD_UNITS } from './constants';
import type { ActivityFormData } from './types';

interface PeriodicityFieldsProps {
  register: UseFormRegister<ActivityFormData>;
  watch: UseFormWatch<ActivityFormData>;
  errors: Record<string, any>;
}

export default function PeriodicityFields({ register, watch, errors }: PeriodicityFieldsProps) {
  const isPeriodic = watch('isPeriodic');

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('isPeriodic')}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="isPeriodic" className="ml-2 block text-sm text-gray-700">
          Recurring activity
        </label>
      </div>

      {isPeriodic && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="periodicity" className="block text-sm font-medium text-gray-700">
              Repeat every
            </label>
            <input
              type="number"
              min="1"
              {...register('periodicity', { 
                min: { value: 1, message: 'Must be at least 1' }
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.periodicity && (
              <p className="mt-2 text-sm text-red-600">{errors.periodicity.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="periodUnit" className="block text-sm font-medium text-gray-700">
              Period
            </label>
            <select
              {...register('periodUnit')}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            >
              {PERIOD_UNITS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}