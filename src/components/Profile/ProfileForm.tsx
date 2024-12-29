import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { updateUserProfile } from '../../services/userService';
import type { UserProfile } from '../../types/user';

interface ProfileFormProps {
  profile: UserProfile;
  onUpdate: () => void;
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
  photoURL: string;
  birthDate: string;
}

export default function ProfileForm({ profile, onUpdate }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      phone: profile.phone || '',
      photoURL: profile.photoURL || '',
      birthDate: profile.birthDate || ''
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setLoading(true);
      await updateUserProfile(profile.id, data);
      onUpdate();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            {...register('firstName', { required: 'First name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.firstName && (
            <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            {...register('lastName', { required: 'Last name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.lastName && (
            <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
            Birth Date
          </label>
          <input
            type="date"
            {...register('birthDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.birthDate && (
            <p className="mt-2 text-sm text-red-600">{errors.birthDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            {...register('phone', {
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: 'Invalid phone number'
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
            Profile Photo URL
          </label>
          <input
            type="url"
            {...register('photoURL')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.photoURL && (
            <p className="mt-2 text-sm text-red-600">{errors.photoURL.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}