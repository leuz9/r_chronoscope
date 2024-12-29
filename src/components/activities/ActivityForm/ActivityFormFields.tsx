import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ACTIVITY_CATEGORIES } from './constants';
import type { ActivityFormData } from './types';

interface ActivityFormFieldsProps {
  onSubmit: (data: ActivityFormData) => Promise<void>;
  loading: boolean;
}

export default function ActivityFormFields({ onSubmit, loading }: ActivityFormFieldsProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ActivityFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <select
          {...register('category', { required: 'Category is required' })}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        >
          <option value="">Select a category</option>
          {ACTIVITY_CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          rows={3}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Duration (hours)
        </label>
        <input
          type="number"
          step="0.5"
          {...register('duration', { 
            required: 'Duration is required',
            min: { value: 0.5, message: 'Duration must be at least 0.5 hours' },
            max: { value: 24, message: 'Duration cannot exceed 24 hours' }
          })}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.duration && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.duration.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Activity'}
        </button>
      </div>
    </form>
  );
}